import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { CustomContext } from "../types/CustomContext";
import { UserResponse } from "../types/UserResponse";
import bcrypt from "bcrypt";
import { Role } from "../../entities/Role";
import { isEmailValid } from "../utils/validation/validateEmail";
import { isPasswordValid } from "../utils/validation/validatePassword";
import { LoginOptions } from "../types/LoginOptions";
import { COOKIE_NAME } from "../../constants";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("role", () => Int, { nullable: true }) roleId: number,
    @Ctx() { req }: CustomContext
  ): Promise<UserResponse> {
    if (!isEmailValid(email)) {
      return {
        errors: [
          {
            field: "email",
            message: "Invalid email",
          },
        ],
      };
    }

    if (!isPasswordValid(password)) {
      return {
        errors: [
          {
            field: "password",
            message:
              "Invalid Password. Needs to be at least 8 charachters long",
          },
        ],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      console.log("angekommen");
      return {
        errors: [{ message: "Internal Server Error. Try again later" }],
      };
    }

    let createdUser;
    try {
      createdUser = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        let errorField = "";
        error.sqlMessage.includes("@")
          ? (errorField = "email")
          : (errorField = "username");
        return {
          errors: [
            {
              field: errorField,
              message: `${capitalizeFirstLetter(errorField)} already exists`,
            },
          ],
        };
      }
    }

    if (!createdUser) {
      return {
        errors: [{ message: "Internal Server Error. Try again later" }],
      };
    }

    req.session.userId = createdUser.id;

    return {
      users: [
        {
          ...createdUser,
        },
      ],
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("LoginOptions") loginOptions: LoginOptions,
    @Ctx() { req }: CustomContext
  ): Promise<UserResponse> {
    let loggedInByEmail = false;
    if (loginOptions.usernameOrEmail.includes("@")) {
      loggedInByEmail = true;
    }

    const matchedUser = await User.findOne(
      loggedInByEmail
        ? { where: { email: loginOptions.usernameOrEmail } }
        : { where: { username: loginOptions.usernameOrEmail } }
    );

    if (!matchedUser) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Invalid Login Data",
          },
        ],
      };
    }

    const isPasswordValid = await bcrypt.compare(
      matchedUser.password,
      loginOptions.password
    );

    if (!isPasswordValid) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid Login Data",
          },
        ],
      };
    }

    req.session.userId = matchedUser.id;

    return {
      users: [
        {
          ...matchedUser,
        },
      ],
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: CustomContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  @Query(() => UserResponse, { nullable: true })
  async me(@Ctx() { req }: CustomContext): Promise<UserResponse | null> {
    if (!req.session.userId) {
      return null;
    }

    const matchedUser = await User.findOne(req!.session!.userId);

    if (!matchedUser) {
      return null;
    }

    return {
      user: {
        ...matchedUser,
      },
    };
  }
}

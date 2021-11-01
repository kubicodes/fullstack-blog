import { Arg, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { CustomContext } from "../types/CustomContext";
import { UserResponse } from "../types/UserResponse";
import argon2 from "argon2";
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
    @Arg("role", () => Int) roleId: number,
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

    const hashedPassword = await argon2.hash(password);

    if (!hashedPassword) {
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
        role_id: roleId,
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

    const matchedRole = await Role.findOne(roleId);

    if (!matchedRole) {
      return {
        errors: [{ field: "role", message: "Invalid Role" }],
      };
    }

    req.session.userId = createdUser.id;

    return {
      users: [
        {
          ...createdUser,
          role: matchedRole?.title,
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
            field: "Username or Password",
            message: "Invalid Username or Password",
          },
        ],
      };
    }

    const isPasswordValid = await argon2.verify(
      matchedUser.password,
      loginOptions.password
    );

    if (!isPasswordValid) {
      return {
        errors: [
          {
            field: "Username or Password",
            message: "Invalid Username or Password",
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
}

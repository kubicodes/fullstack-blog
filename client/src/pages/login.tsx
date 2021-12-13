import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
} from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import { withApollo } from "../utils/withApollo";

const Register = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  const { data: meQueryData, loading } = useMeQuery();

  const handleSubmit = async (values, { setErrors }) => {
    const response = await login({
      variables: {
        loginOptions: {
          usernameOrEmail: values.usernameOrEmail,
          password: values.password,
        },
      },
      update: (cache, { data }) => {
        if (data?.login?.errors) {
          return;
        }

        if (data?.login?.users[0]) {
          const userData = data.login.users[0];
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: {
                user: {
                  ...userData,
                },
              },
            },
          });
        }
      },
    });

    if (response.data?.login.errors) {
      const formikFormattedErrors: Record<string, string> = errorMap(
        response.data.login.errors
      );

      setErrors(formikFormattedErrors);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (meQueryData?.me) {
      router.back();
      return;
    }
  }, [meQueryData]);

  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {!loading && !meQueryData?.me?.user ? (
              <Flex width="Full" align="center" justifyContent="center">
                <Box
                  p={8}
                  maxWidth="500px"
                  borderWidth={1}
                  borderRadius={8}
                  boxShadow="lg"
                >
                  <Box textAlign="center">
                    <Heading> Login </Heading>
                  </Box>
                  <Box my={4} textAlign="left">
                    <InputField
                      name="usernameOrEmail"
                      type="text"
                      placeholder="Username Or Email"
                      boxSize="lg"
                      label="Username Or Email"
                    />
                    <InputField
                      name="password"
                      type="password"
                      placeholder="Password"
                      boxSize="lg"
                      label="Password"
                    />
                    <Button
                      colorScheme="teal"
                      width="full"
                      mt={4}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      'Sign In'
                    </Button>
                  </Box>
                </Box>
              </Flex>
            ) : null}
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Register);

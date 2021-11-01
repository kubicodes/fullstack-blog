import { Button, FormErrorMessage } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation, useRolesQuery } from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import { withApollo } from "../utils/withApollo";

const Login = () => {
  const [register] = useRegisterMutation();
  const { data: rolesData } = useRolesQuery();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const authorRole = rolesData?.roles.roles.find(
            (role) => role.title === "author"
          );
          const response = await register({
            variables: {
              role: authorRole.id,
              email: values.email,
              username: values.username,
              password: values.password,
            },
          });

          if (response.data?.register.errors) {
            const formikFormattedErrors = errorMap(
              response.data.register.errors
            );
            setErrors(formikFormattedErrors);
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl isRequired isInvalid={!!form.errors.email}>
                        <FormLabel> Email </FormLabel>
                        <Input
                          {...field}
                          type="email"
                          name="email"
                          placeholder="Email"
                          size="lg"
                        />
                        {form.errors.email ? (
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={!!form.errors.username}
                        mt={6}
                      >
                        <FormLabel> Username </FormLabel>
                        <Input
                          {...field}
                          type="text"
                          name="username"
                          placeholder="Username"
                          size="lg"
                        />
                        {form.errors.username ? (
                          <FormErrorMessage>
                            {form.errors.username}
                          </FormErrorMessage>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={!!form.errors.password}
                        mt={6}
                      >
                        <FormLabel> Password </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                        {form.errors.password ? (
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>
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
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);

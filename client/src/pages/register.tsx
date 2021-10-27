import { Button, FormErrorMessage } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Wrapper } from "../components/Wrapper";

const Login = () => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
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
                      <FormControl isRequired>
                        <FormLabel> Email </FormLabel>
                        <Input
                          {...field}
                          type="email"
                          name="email"
                          placeholder="Email"
                          size="lg"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl isRequired mt={6}>
                        <FormLabel> Username </FormLabel>
                        <Input
                          {...field}
                          type="text"
                          name="username"
                          placeholder="Username"
                          size="lg"
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl isRequired mt={6}>
                        <FormLabel> Password </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
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

export default Login;

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import InputField from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import {
  MeDocument,
  MeQuery,
  useMeQuery,
  useRegisterMutation
} from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import { withApollo } from "../utils/withApollo";

const Register = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  const { data: meQueryData, loading } = useMeQuery();

  const handleSubmit = async (values, { setErrors }) => {
    const response = await register({
      variables: {
        email: values.email,
        username: values.username,
        password: values.password,
      },
      update: (cache, { data }) => {
        if (!data?.register.errors) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: {
                __typename: "UserResponse",
                user: data?.register?.users[0],
              },
            },
          });
        }
      },
    });

    if (response.data?.register.errors) {
      const formikFormattedErrors = errorMap(response.data.register.errors);
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
        initialValues={{ email: "", username: "", password: "" }}
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
                    <Heading> Register </Heading>
                  </Box>
                  <Box my={4} textAlign="left">
                    <InputField
                      name="email"
                      type="email"
                      placeholder="Email"
                      boxSize="lg"
                      label="Email"
                    />
                    <InputField
                      name="username"
                      type="username"
                      placeholder="Username"
                      boxSize="lg"
                      label="Username"
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

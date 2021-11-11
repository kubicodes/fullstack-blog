import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/dist/client/router";
import React, { useEffect } from "react";
import InputField from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useMeQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const CreatePost = () => {
  const { data: meQueryData } = useMeQuery();

  useEffect(() => {
    if (!meQueryData?.me) {
      router.back();
      return;
    }
  }, [meQueryData]);

  return (
    <Layout>
      <Heading fontSize="xl">Create Post</Heading>
      <Formik
        initialValues={{ headline: "", body: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box m={4} textAlign="left" maxWidth={"100%"}>
              <InputField
                name="headline"
                type="text"
                placeholder="Title"
                boxSize="lg"
                label="Headline"
              />
              <Box mt={5} />
              <InputField
                isTextArea={true}
                name="body"
                type="text"
                placeholder="Your Post"
                boxSize="lg"
                label="Post"
              />
              <Button
                colorScheme="twitter"
                mt={8}
                type="submit"
                isLoading={isSubmitting}
              >
                'Create Post'
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);

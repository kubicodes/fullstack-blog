import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import router from "next/dist/client/router";
import React, { useEffect } from "react";
import InputField from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useCreatePostMutation, useMeQuery } from "../../generated/graphql";
import { errorMap } from "../../utils/errorMap";
import { withApollo } from "../../utils/withApollo";

type SubmitValues = {
  headline: string;
  body: string;
};

const CreatePost = () => {
  const { data: meQueryData, loading: meQueryLoading } = useMeQuery();
  const [createPost] = useCreatePostMutation();

  useEffect(() => {
    if (!meQueryLoading && !meQueryData?.me) {
      router.back();
      return;
    }
  }, [meQueryData]);

  const handleSubmit = async (values: SubmitValues, { setErrors }) => {
    const { data } = await createPost({
      variables: {
        headline: values.headline,
        body: values.body,
      },
      update: (cache) => {
        cache.evict({ fieldName: "posts({})" });
      },
    });

    if (data.createPost?.errors) {
      const formikFormattedErrors: Record<string, string> = errorMap(
        data.createPost.errors
      );
      setErrors(formikFormattedErrors);
    } else {
      router.push("/");
    }
  };
  return (
    <Layout>
      <Heading fontSize="xl">Create Post</Heading>
      <Formik
        initialValues={{ headline: "", body: "" }}
        onSubmit={handleSubmit}
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

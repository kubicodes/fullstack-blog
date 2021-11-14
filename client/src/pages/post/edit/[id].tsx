import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import InputField from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  useMeQuery,
  usePostsQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { errorMap } from "../../../utils/errorMap";
import { withApollo } from "../../../utils/withApollo";

type SubmitValues = {
  headline: string;
  body: string;
};

const EditPost = () => {
  const router = useRouter();
  const { data: meQueryData, loading: meQueryLoading } = useMeQuery();
  const [updatePost] = useUpdatePostMutation();

  const postId = parseInt(router.query.id as string);
  const { data: postData, loading: postLoading } = usePostsQuery({
    variables: { postId },
  });

  useEffect(() => {
    if (!meQueryLoading && !meQueryData?.me) {
      router.back();
      return;
    }
  }, [meQueryData]);

  if (!postLoading && !postData) {
    return (
      <Layout>
        <Text>There was an error try again later.</Text>
      </Layout>
    );
  }

  if (postLoading && !postData) {
    return (
      <Layout>
        <Text>Loading ...</Text>
      </Layout>
    );
  }

  const handleSubmit = async (values: SubmitValues, { setErrors }) => {
    const { data } = await updatePost({
      variables: {
        postId,
        headline: values.headline,
        body: values.body,
      },
    });

    if (data.updatePost?.errors) {
      const formikFormattedErrors: Record<string, string> = errorMap(
        data.updatePost.errors
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
        initialValues={{
          headline: postData.posts?.posts[0].headline,
          body: postData.posts?.posts[0].body,
        }}
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
                'Edit Post'
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);

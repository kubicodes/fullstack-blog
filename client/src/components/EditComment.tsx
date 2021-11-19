import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { Dispatch, useState } from "react";
import { useUpdateCommentMutation } from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import InputField from "./InputField";

type EditCommentProps = {
  show: boolean;
  postId: number;
  commentId: number;
  setClickedCommentId: Dispatch<React.SetStateAction<number>>;
  commentBody: string;
};

type SubmitValues = {
  body: string;
};

const EditComment: React.FC<EditCommentProps> = ({
  postId,
  commentId,
  show,
  setClickedCommentId,
  commentBody,
}) => {
  const [updateComment] = useUpdateCommentMutation();

  const handleSubmit = async (values: SubmitValues, { setErrors }) => {
    let cacheDeleteResult;
    const response = await updateComment({
      variables: { commentId, body: values.body },
      update: (cache) => {
        cacheDeleteResult = cache.evict({
          fieldName: "comments",
        });
      },
    });

    if (response.data.updateComment?.errors) {
      const formikFormattedErrors: Record<string, string> = errorMap(
        response.data.updateComment.errors
      );

      setErrors(formikFormattedErrors);
    }

    if (cacheDeleteResult) {
      setClickedCommentId(0);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <Formik initialValues={{ body: commentBody }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              isTextArea={true}
              name="body"
              type="text"
              placeholder="Your Comment"
              boxSize="lg"
              label="Comment"
            />
            <Flex>
              <Button
                colorScheme="twitter"
                mt={8}
                type="submit"
                isLoading={isSubmitting}
              >
                'Edit Comment'
              </Button>
              <Button
                alignItems={"center"}
                justifyContent={"center"}
                mt={"auto"}
                ml={5}
                colorScheme={"cyan"}
                onClick={() => setClickedCommentId(0)}
              >
                Cancel
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditComment;

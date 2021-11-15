import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import React, { Dispatch } from "react";
import { useCreateCommentMutation } from "../generated/graphql";
import { errorMap } from "../utils/errorMap";
import InputField from "./InputField";

type CreateCommentProps = {
  show: boolean;
  postId: number;
  setShow: Dispatch<React.SetStateAction<boolean>>;
};

type SubmitValues = {
  body: string;
};

const CreateComment: React.FC<CreateCommentProps> = ({
  show,
  postId,
  setShow,
}) => {
  const [createComment] = useCreateCommentMutation();

  const handleSubmit = async (values: SubmitValues, { setErrors }) => {
    let cacheDeleteResult;
    const { data } = await createComment({
      variables: { postId, body: values.body },
      update: (cache) => {
        cacheDeleteResult = cache.evict({
          fieldName: `posts({"postId":${postId}})`,
        });
      },
    });

    if (data.createComment?.errors) {
      const formikFormattedErrors: Record<string, string> = errorMap(
        data.createComment.errors
      );

      setErrors(formikFormattedErrors);
    }

    if (cacheDeleteResult) {
      values.body = "";
      setShow(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <Formik initialValues={{ body: "" }} onSubmit={handleSubmit}>
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
            <Button
              colorScheme="twitter"
              mt={8}
              type="submit"
              isLoading={isSubmitting}
            >
              'Create Comment'
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateComment;

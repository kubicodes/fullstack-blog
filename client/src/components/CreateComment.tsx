import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import React from "react";
import InputField from "./InputField";

type CreateCommentProps = {
  show: boolean;
};
const CreateComment: React.FC<CreateCommentProps> = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <Formik
        initialValues={{ body: "" }}
        onSubmit={(values) => console.log(values)}
      >
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

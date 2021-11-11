import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Textarea, Input } from "@chakra-ui/react";
import { Field } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  boxSize: string;
  isTextArea?: boolean;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const InputOrTextArea: any = props.isTextArea ? Textarea : Input;
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControl isRequired isInvalid={!!form.errors[props.name]}>
          <FormLabel>{props.label}</FormLabel>
          <InputOrTextArea
            {...field}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            size={props.boxSize}
          />
          {form.errors[props.name] ? (
            <FormErrorMessage>{form.errors[props.name]}</FormErrorMessage>
          ) : null}
        </FormControl>
      )}
    </Field>
  );
};

export default InputField;

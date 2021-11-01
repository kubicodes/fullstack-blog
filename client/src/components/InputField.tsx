import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  boxSize: string;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControl isRequired isInvalid={!!form.errors[props.name]}>
          <FormLabel>{props.label}</FormLabel>
          <Input
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

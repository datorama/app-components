import React, { useState, useCallback } from "react";
import { noop } from "lodash/fp";

import Input, { InputProps } from "packages/core/Input";

export const Default = (props: InputProps) => {
  const [value, setValue] = useState("");
  const handleChange = useCallback((e) => setValue(e.target.value), []);

  return <Input onChange={handleChange} {...props} value={value} />;
};

export const Disabled = () => (
  <Input
    placeholder="Disabled input"
    value=""
    onChange={noop}
    isDisabled={true}
  />
);

export const Required = () => (
  <Input
    placeholder="John Do"
    value=""
    onChange={noop}
    isRequired={true}
    label="First Name"
  />
);

export const Error = () => (
  <Input
    placeholder="John Do"
    value=""
    onChange={noop}
    isError={true}
    label="First Name"
    errorMessage="Something went wrong"
  />
);

export const Success = () => (
  <Input
    placeholder="John Do"
    value=""
    onChange={noop}
    isValid={true}
    label="First Name"
    validMessage="Saved successfully!"
  />
);

export default {
  title: "Core/Input",
  component: Input,
};

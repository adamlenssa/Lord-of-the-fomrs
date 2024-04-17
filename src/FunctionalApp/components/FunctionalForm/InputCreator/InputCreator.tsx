import { ComponentProps } from "react";

function InputCreator({
  props,
  name,
}: {
  props: ComponentProps<"input">;
  name: string;
}) {
  return (
    <>
      <label htmlFor={name}>{name}:</label>
      <input {...props} name={name} />
    </>
  );
}

export default InputCreator;

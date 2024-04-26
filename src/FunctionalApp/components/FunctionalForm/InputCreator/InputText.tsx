import { ComponentProps } from "react";

function InputText({
  props,
  name,
}: {
  props: ComponentProps<"input">;
  name: string;
}) {
  return (
    <div className="input-wrap">
      <label htmlFor={name}>{name}:</label>
      <input {...props} name={name} />
    </div>
  );
}

export default InputText;

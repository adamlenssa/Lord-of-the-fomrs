import { Component, ComponentProps } from "react";

export class InputCreator extends Component<{
  name: string;
  props: ComponentProps<"input">;
}> {
  render() {
    const { name, props } = this.props;
    return (
      <>
        <label htmlFor={name}>{name}:</label>
        <input {...props} name={name} />
      </>
    );
  }
}

export default InputCreator;

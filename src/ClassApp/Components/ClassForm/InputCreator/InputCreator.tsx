import { Component, ComponentProps } from "react";

export class InputCreator extends Component<{
  name: string;
  props: ComponentProps<"input">;
}> {
  render() {
    const { name, props } = this.props;
    return (
      <div className="input-wrap">
        <label htmlFor={name}>{name}:</label>
        <input {...props} name={name} />
      </div>
    );
  }
}

export default InputCreator;

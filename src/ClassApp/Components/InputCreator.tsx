import React, { Component, ComponentProps } from 'react'

export class InputCreator extends Component<InputCreator> {
    const {name, inputProps}:{name: string, inputProps: ComponentProps<'input'>} = this.props;
  render() {
    return (
      <div className='input-wrap'>
        <label htmlFor=""></label>
      </div>
    )
  }
}

export default InputCreator

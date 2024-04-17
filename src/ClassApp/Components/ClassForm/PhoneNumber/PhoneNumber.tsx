import { ChangeEventHandler, Component, createRef } from "react";
export type PhoneNumberState = [string, string, string, string];

export class PhoneNumber extends Component<{
  phoneNumber: PhoneNumberState;
  submitRef: React.RefObject<HTMLInputElement>;
  handleData: (data: PhoneNumberState) => void;
}> {
  render() {
    const { phoneNumber, submitRef, handleData } = this.props;
    const refs = [
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
    ];
    const [ref0, ref1, ref2, ref3] = [refs[0], refs[1], refs[2], refs[3]];
    const createOnChangeFunction =
      (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        const lengths = [2, 2, 2, 1];
        const currentMaxLength = lengths[index];
        const nextRef = refs[index + 1];
        const currentRef = refs[index];
        const prevRef = refs[index - 1];
        const value = e.target.value;
        if (value.length == currentMaxLength && nextRef) {
          nextRef.current?.focus();
        } else if (value.length == currentMaxLength && currentRef == refs[3]) {
          submitRef.current?.focus();
        }
        if (value.length == 0 && prevRef) {
          prevRef.current?.focus();
        } else if (value.length == 0 && currentRef == ref0) {
          currentRef.current?.focus();
        }
        const newState = phoneNumber.map((section, phoneIndex) =>
          index === phoneIndex ? e.target.value : section
        ) as PhoneNumberState;
        handleData(newState);
      };
    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            value={phoneNumber[0]}
            onChange={createOnChangeFunction(0)}
            ref={ref0}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            value={phoneNumber[1]}
            onChange={createOnChangeFunction(1)}
            ref={ref1}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            value={phoneNumber[2]}
            onChange={createOnChangeFunction(2)}
            ref={ref2}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            value={phoneNumber[3]}
            onChange={createOnChangeFunction(3)}
            ref={ref3}
          />
        </div>
      </div>
    );
  }
}

export default PhoneNumber;

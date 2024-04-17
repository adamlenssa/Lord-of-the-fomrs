import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import InputCreator from "./Components/InputCreator/InputCreator";
import PhoneNumber, {
  PhoneNumberState,
} from "./Components/PhoneNumber/PhoneNumber";
import { userInput } from "../FunctionalApp/FunctionalForm";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";
type state = {
  userInformation: userInput | null;
  phoneNumber: PhoneNumberState;
};

export class ClassForm extends Component {
  state: state = {
    userInformation: null,
    phoneNumber: ["", "", "", ""],
  };
  handleDataChange = (data: PhoneNumberState) => {
    this.setState({
      userInformation: this.state.userInformation,
      phoneNumber: data,
    });
  };
  render() {
    const sumbitRef = createRef<HTMLInputElement>();
    return (
      <form>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <InputCreator
            name="First Name"
            props={{ type: "text", placeholder: "Frodo" }}
          />
        </div>
        <ErrorMessage message={firstNameErrorMessage} show={true} />

        {/* last name input */}
        <div className="input-wrap">
          <InputCreator
            name="Last Name"
            props={{ type: "text", placeholder: "Baggins" }}
          />
        </div>
        <ErrorMessage message={lastNameErrorMessage} show={true} />

        {/* Email Input */}
        <div className="input-wrap">
          <InputCreator
            name="Email"
            props={{
              type: "text",
              placeholder: "bilbo-baggins@adventurehobbits.net",
            }}
          />
        </div>
        <ErrorMessage message={emailErrorMessage} show={true} />

        {/* City Input */}
        <div className="input-wrap">
          <InputCreator
            name="City"
            props={{
              type: "text",
              placeholder: "Hobbiton",
              list: "datalist",
              id: "city",
            }}
          />
        </div>
        <ErrorMessage message={cityErrorMessage} show={true} />

        <PhoneNumber
          phoneNumber={this.state.phoneNumber}
          submitRef={sumbitRef}
          handleData={this.handleDataChange}
        />

        <ErrorMessage message={phoneNumberErrorMessage} show={true} />

        <input type="submit" value="Submit" ref={sumbitRef} />
      </form>
    );
  }
}

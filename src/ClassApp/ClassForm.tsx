import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import InputCreator from "./Components/InputCreator/InputCreator";
import PhoneNumber, {
  PhoneNumberState,
} from "./Components/PhoneNumber/PhoneNumber";
import { userInput } from "../FunctionalApp/FunctionalForm";
import { UserInformation } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";
type state = {
  userInformation: userInput | null;
  phoneNumber: PhoneNumberState;
};

export class ClassForm extends Component<{
  userData: (userData: UserInformation) => void;
}> {
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
    const { userData } = this.props;
    const { userInformation, phoneNumber } = this.state;
    const sumbitRef = createRef<HTMLInputElement>();
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <InputCreator
            name="First Name"
            props={{
              type: "text",
              placeholder: "Frodo",
              onChange: (e) => {
                this.setState({
                  userInformation: {
                    firstName: e.target.value,
                    lastName: userInformation?.lastName,
                    email: userInformation?.email,
                    city: userInformation?.city,
                  },
                  phoneNumber: phoneNumber,
                });
              },
            }}
          />
        </div>
        <ErrorMessage message={firstNameErrorMessage} show={true} />

        {/* last name input */}
        <div className="input-wrap">
          <InputCreator
            name="Last Name"
            props={{
              type: "text",
              placeholder: "Baggins",
              onChange: (e) => {
                this.setState({
                  userInformation: {
                    firstName: userInformation?.firstName,
                    lastName: e.target.value,
                    email: userInformation?.email,
                    city: userInformation?.city,
                  },
                  phoneNumber: phoneNumber,
                });
              },
            }}
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
              onChange: (e) => {
                this.setState({
                  userInformation: {
                    firstName: userInformation?.email,
                    lastName: userInformation?.lastName,
                    email: e.target.value,
                    city: userInformation?.city,
                  },
                  phoneNumber: phoneNumber,
                });
              },
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
              onChange: (e) => {
                this.setState({
                  userInformation: {
                    firstName: userInformation?.firstName,
                    lastName: userInformation?.lastName,
                    email: userInformation?.email,
                    city: e.target.value,
                  },
                  phoneNumber: phoneNumber,
                });
              },
            }}
          />
        </div>
        <ErrorMessage message={cityErrorMessage} show={true} />

        <PhoneNumber
          phoneNumber={phoneNumber}
          submitRef={sumbitRef}
          handleData={this.handleDataChange}
        />

        <ErrorMessage message={phoneNumberErrorMessage} show={true} />

        <input type="submit" value="Submit" ref={sumbitRef} />
      </form>
    );
  }
}

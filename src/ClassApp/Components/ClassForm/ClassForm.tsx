import { Component, createRef } from "react";
import { ErrorMessage } from "../../../ErrorMessage";
import InputCreator from "./InputCreator/InputCreator";
import PhoneNumber, { PhoneNumberState } from "./PhoneNumber/PhoneNumber";
import { allCities } from "../../../utils/all-cities";
import { userInput } from "../../../FunctionalApp/components/FunctionalForm/FunctionalForm";
import { UserInformation } from "../../../types";
import {
  isCityValid,
  isEmailValid,
  isPhoneValid,
} from "../../../utils/validations";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";
type State = {
  userInformation: userInput;
  phoneNumber: PhoneNumberState;
  trigger: boolean;
};

export class ClassForm extends Component<{
  setUserInputs: (userData: UserInformation) => void;
}> {
  state: State = {
    userInformation: {
      firstName: "",
      lastName: "",
      email: "",
      city: "",
    },
    phoneNumber: ["", "", "", ""],
    trigger: false,
  };
  handleDataChange = (data: PhoneNumberState) => {
    this.setState({
      userInformation: this.state.userInformation,
      phoneNumber: data,
    });
  };
  reset = () => {
    this.setState({
      userInformation: {
        firstName: "",
        lastName: "",
        email: "",
        city: "",
      },
      phoneNumber: ["", "", "", ""],
      trigger: false,
    });
  };

  render() {
    const { setUserInputs } = this.props;
    const { userInformation, phoneNumber, trigger } = this.state;
    const sumbitRef = createRef<HTMLInputElement>();
    const firstNameErrorShow = userInformation.firstName.length < 2;
    const lastNameErrorShow = userInformation.lastName.length < 2;
    const emailErrorShow = !isEmailValid(userInformation.email);
    const cityErrorShow = isCityValid(userInformation.city);
    const joined = phoneNumber.join("");
    const phoneNumberErrorShow = joined.length != 7;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            !firstNameErrorShow &&
            !lastNameErrorShow &&
            !emailErrorShow &&
            !cityErrorShow &&
            !phoneNumberErrorShow
          ) {
            setUserInputs({
              firstName: userInformation.firstName,
              lastName: userInformation.lastName,
              email: userInformation.email,
              city: userInformation.city,
              phone: phoneNumber.join("-"),
            });
            this.reset();
          } else {
            alert("Bad Information");
            this.setState({
              trigger: true,
            });
          }
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <InputCreator
          name="First Name"
          props={{
            type: "text",
            placeholder: "Frodo",
            value: userInformation.firstName,
            onChange: (e) => {
              this.setState({
                userInformation: {
                  firstName: e.target.value,
                  lastName: userInformation.lastName,
                  email: userInformation.email,
                  city: userInformation.city,
                },
                phoneNumber: phoneNumber,
              });
            },
          }}
        />
        <ErrorMessage
          message={firstNameErrorMessage}
          show={Boolean(trigger && firstNameErrorShow)}
        />

        {/* last name input */}
        <InputCreator
          name="Last Name"
          props={{
            type: "text",
            placeholder: "Baggins",
            value: userInformation.lastName,
            onChange: (e) => {
              this.setState({
                userInformation: {
                  firstName: userInformation.firstName,
                  lastName: e.target.value,
                  email: userInformation.email,
                  city: userInformation.city,
                },
                phoneNumber: phoneNumber,
              });
            },
          }}
        />
        <ErrorMessage
          message={lastNameErrorMessage}
          show={Boolean(trigger && lastNameErrorShow)}
        />

        {/* Email Input */}
        <InputCreator
          name="Email"
          props={{
            type: "text",
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: userInformation.email,
            onChange: (e) => {
              this.setState({
                userInformation: {
                  firstName: userInformation.firstName,
                  lastName: userInformation.lastName,
                  email: e.target.value,
                  city: userInformation.city,
                },
                phoneNumber: phoneNumber,
              });
            },
          }}
        />
        <ErrorMessage
          message={emailErrorMessage}
          show={Boolean(trigger && emailErrorShow)}
        />

        {/* City Input */}
        <InputCreator
          name="City"
          props={{
            type: "text",
            placeholder: "Hobbiton",
            value: userInformation.city,
            list: "cities",
            id: "city",
            onChange: (e) => {
              this.setState({
                userInformation: {
                  firstName: userInformation.firstName,
                  lastName: userInformation.lastName,
                  email: userInformation.email,
                  city: e.target.value,
                },
                phoneNumber: phoneNumber,
              });
            },
          }}
        />
        <ErrorMessage
          message={cityErrorMessage}
          show={Boolean(trigger && isCityValid(userInformation.city))}
        />

        <PhoneNumber
          phoneNumber={phoneNumber}
          handleData={this.handleDataChange}
        />

        <ErrorMessage
          message={phoneNumberErrorMessage}
          show={Boolean(trigger && isPhoneValid(phoneNumber))}
        />

        <input type="submit" value="Submit" ref={sumbitRef} />
      </form>
    );
  }
}

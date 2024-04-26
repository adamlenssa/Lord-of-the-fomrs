import { useState } from "react";
import { ErrorMessage } from "../../../ErrorMessage";
import InputText from "./InputCreator/InputText";
import PhoneNumberComponent from "./PhoneNumberComponent/PhoneNumberComponent";
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
export type PhoneNumberState = [string, string, string, string];
export type UserInput = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
};
export const FunctionalForm = ({
  setUserData,
}: {
  setUserData: (userData: UserInformation) => void;
}) => {
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumberState>([
    "",
    "",
    "",
    "",
  ]);
  const [userInputs, setUserInputs] = useState<UserInput>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });
  const [errorShow, setErrorShow] = useState<boolean>(false);
  const firstNameInput = userInputs.firstName;
  const lastNameInput = userInputs.lastName;
  const emailInput = userInputs.email;
  const cityInput = userInputs.city;
  const firstNameErrorShow = userInputs.firstName.length < 2;
  const lastNameErrorShow = userInputs.lastName.length < 2;
  const emailErrorShow = !isEmailValid(userInputs.email);
  const cityErrorShow = isCityValid(userInputs.city);
  const joined = phoneNumber.join("");
  const phoneNumberErrorShow = joined.length != 7;
  const reset = () => {
    setUserInputs({
      firstName: "",
      lastName: "",
      email: "",
      city: "",
    });
    setPhoneNumber(["", "", "", ""]);
    setErrorShow(false);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          firstNameErrorShow ||
          lastNameErrorShow ||
          emailErrorShow ||
          cityErrorShow ||
          phoneNumberErrorShow
        ) {
          alert("Improper Information");
          setErrorShow(true);
          return;
        }
        setUserData({
          firstName: userInputs.firstName,
          lastName: userInputs.lastName,
          email: userInputs.email,
          city: userInputs.city,
          phone: phoneNumber.join("-"),
        });
        reset();
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <InputText
        props={{
          type: "text",
          placeholder: "Frodo",
          onChange: (e) => {
            setUserInputs({
              firstName: e.target.value,
              lastName: lastNameInput,
              email: emailInput,
              city: cityInput,
            });
          },
          value: userInputs.firstName,
        }}
        name="First Name"
      />
      <ErrorMessage
        message={firstNameErrorMessage}
        show={Boolean(errorShow && firstNameErrorShow)}
      />
      {/* last name input */}
      <InputText
        props={{
          type: "text",
          placeholder: "Baggins",
          onChange: (e) => {
            setUserInputs({
              firstName: firstNameInput,
              lastName: e.target.value,
              email: emailInput,
              city: cityInput,
            });
          },
          value: userInputs.lastName,
        }}
        name="Last Name"
      />
      <ErrorMessage
        message={lastNameErrorMessage}
        show={Boolean(errorShow && lastNameErrorShow)}
      />

      {/* Email Input */}
      <InputText
        props={{
          type: "text",
          placeholder: "bilbo-baggins@adventurehobbits.net",
          onChange: (e) => {
            setUserInputs({
              firstName: firstNameInput,
              lastName: lastNameInput,
              email: e.target.value,
              city: cityInput,
            });
          },
          value: userInputs.email,
        }}
        name="Email"
      />
      <ErrorMessage
        message={emailErrorMessage}
        show={Boolean(errorShow && emailErrorShow)}
      />
      {/* City Input */}
      <InputText
        props={{
          type: "text",
          placeholder: "Hobbiton",
          list: "cities",
          id: "city",
          value: userInputs.city,
          onChange: (e) => {
            setUserInputs({
              firstName: firstNameInput,
              lastName: lastNameInput,
              email: emailInput,
              city: e.target.value,
            });
          },
        }}
        name="City"
      />
      <ErrorMessage
        message={cityErrorMessage}
        show={Boolean(errorShow && isCityValid(userInputs.city))}
      />

      <PhoneNumberComponent
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={Boolean(errorShow && isPhoneValid(phoneNumber))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

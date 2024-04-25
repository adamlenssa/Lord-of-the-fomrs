import { useState } from "react";
import { ErrorMessage } from "../../../ErrorMessage";
import InputCreator from "./InputCreator/InputCreator";
import PhoneNumberComponent from "./PhoneNumberComponent/PhoneNumberComponent";
import { UserInformation } from "../../../types";
import { allCities } from "../../../utils/all-cities";
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
export type userInput = {
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
  const [userInputs, setUserInputs] = useState<userInput>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });
  const [trigger, setTrigger] = useState<boolean>(false);
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
          setUserData({
            firstName: userInputs.firstName,
            lastName: userInputs.lastName,
            email: userInputs.email,
            city: userInputs.city,
            phone: phoneNumber.join("-"),
          });
          setUserInputs({
            firstName: "",
            lastName: "",
            email: "",
            city: "",
          });
          setPhoneNumber(["", "", "", ""]);
          setTrigger(false);
        } else {
          alert("Improper Information");
          setTrigger(true);
        }
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <InputCreator
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
      </div>
      <ErrorMessage
        message={firstNameErrorMessage}
        show={Boolean(trigger && firstNameErrorShow)}
      />
      {/* last name input */}
      <div className="input-wrap">
        <InputCreator
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
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={Boolean(trigger && lastNameErrorShow)}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <InputCreator
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
      </div>
      <ErrorMessage
        message={emailErrorMessage}
        show={Boolean(trigger && emailErrorShow)}
      />
      {/* City Input */}
      <div className="input-wrap">
        <InputCreator
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
      </div>
      <ErrorMessage
        message={cityErrorMessage}
        show={Boolean(trigger && isCityValid(userInputs.city))}
      />

      <PhoneNumberComponent
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={Boolean(trigger && isPhoneValid(phoneNumber))}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

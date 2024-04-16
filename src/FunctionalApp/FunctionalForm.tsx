import { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import InputCreator from "./components/InputCreator/InputCreator";
import PhoneNumberComponent from "./components/PhoneNumberComponent/PhoneNumberComponent";
import { UserInformation } from "../types";
import { allCities } from "../utils/all-cities";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";
let trigger = 1;
export type PhoneNumberState = [string, string, string, string];
type userInput = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  city: string | undefined;
};
export const FunctionalForm = ({
  userData,
  errorInformation,
}: {
  userData: (userData: UserInformation) => void;
  errorInformation: UserInformation | null;
}) => {
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumberState>([
    "",
    "",
    "",
    "",
  ]);
  const [userInfo, setUserInformation] = useState<userInput | null>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
  });
  const firstNameInput = userInfo?.firstName;
  const lastNameInput = userInfo?.lastName;
  const emailInput = userInfo?.email;
  const cityInput = userInfo?.city;
  const sumbitRef = useRef<HTMLInputElement>(null);
  const firstNameErrorShow = userInfo?.firstName?.length < 2;
  const lastNameErrorShow = userInfo?.lastName?.length < 2;
  const emailErrorShow = !userInfo?.email?.includes("@");
  const cityErrorShow = !allCities.find((city) => city == userInfo?.city);
  const joined = phoneNumber.join("");
  const phoneNumberErrorShow = joined.length != 7;
  console.log(trigger);
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
          userData({
            firstName: userInfo?.firstName,
            lastName: userInfo?.lastName,
            email: userInfo?.email,
            city: userInfo?.city,
            phone: phoneNumber.join("-"),
          });
          setUserInformation({
            firstName: "",
            lastName: "",
            email: "",
            city: "",
          });
          setPhoneNumber(["", "", "", ""]);
          trigger = 1;
        } else {
          alert("Improper Information");
          trigger = 2;
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
              setUserInformation({
                firstName: e.target.value,
                lastName: lastNameInput,
                email: emailInput,
                city: cityInput,
              });
            },
            value: userInfo?.firstName,
          }}
          name="First Name"
        />
      </div>
      <ErrorMessage
        message={firstNameErrorMessage}
        show={Boolean(trigger == 2 && firstNameErrorShow)}
      />
      {/* last name input */}
      <div className="input-wrap">
        <InputCreator
          props={{
            type: "text",
            placeholder: "Baggins",
            onChange: (e) => {
              setUserInformation({
                firstName: firstNameInput,
                lastName: e.target.value,
                email: emailInput,
                city: cityInput,
              });
            },
            value: userInfo?.lastName,
          }}
          name="Last Name"
        />
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={Boolean(trigger == 2 && lastNameErrorShow)}
      />

      {/* Email Input */}
      <div className="input-wrap">
        <InputCreator
          props={{
            type: "text",
            placeholder: "bilbo-baggins@adventurehobbits.net",
            onChange: (e) => {
              setUserInformation({
                firstName: firstNameInput,
                lastName: lastNameInput,
                email: e.target.value,
                city: cityInput,
              });
            },
            value: userInfo?.email,
          }}
          name="Email"
        />
      </div>
      <ErrorMessage
        message={emailErrorMessage}
        show={Boolean(trigger == 2 && emailErrorShow)}
      />
      {/* City Input */}
      <div className="input-wrap">
        <InputCreator
          props={{
            type: "text",
            placeholder: "Hobbiton",
            list: "datalist",
            id: "city",
            value: userInfo?.city,
            onChange: (e) => {
              setUserInformation({
                firstName: firstNameInput,
                lastName: lastNameInput,
                email: emailInput,
                city: e.target.value,
              });
            },
          }}
          name="City"
        />
        <datalist id="datalist">
          {allCities.map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </datalist>
      </div>
      <ErrorMessage
        message={cityErrorMessage}
        show={Boolean(trigger == 2 && cityErrorShow)}
      />

      <PhoneNumberComponent
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        submitRef={sumbitRef}
      />

      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={Boolean(trigger == 2 && phoneNumberErrorShow)}
      />

      <input type="submit" value="Submit" ref={sumbitRef} />
    </form>
  );
};

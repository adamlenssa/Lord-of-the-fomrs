import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./components/FunctionalForm/FunctionalForm";
import { UserInformation } from "../types";

export const FunctionalApp = () => {
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userInformation} />
      <FunctionalForm setUserData={setUserInformation} />
    </>
  );
};

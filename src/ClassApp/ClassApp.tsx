import { Component } from "react";
import { ClassForm } from "./Components/ClassForm/ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
type State = { userInformation: UserInformation | null };

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = { userInformation: null };
  render() {
    console.log(this.state.userInformation);
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userInformation} />
        <ClassForm
          setUserInputs={(userInformation) => {
            this.setState({ userInformation: userInformation });
          }}
        />
      </>
    );
  }
}

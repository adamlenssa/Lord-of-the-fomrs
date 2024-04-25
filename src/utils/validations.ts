import { allCities } from "./all-cities";
export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isCityValid(city: string) {
  const City = city[0]?.toUpperCase() + city?.slice(1);
  const answer = !allCities.find((validCity) => validCity == City)
    ? true
    : false;
  return answer;
}

export function isPhoneValid(phoneNumber: [string, string, string, string]) {
  const joined = phoneNumber.join("");
  const answer = joined.length !== 7 ? true : false;
  return answer;
}

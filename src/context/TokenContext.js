import { createContext } from "react";
const TokenContext = createContext({
  token: "",
  setToken: () => {},
});
export default TokenContext;

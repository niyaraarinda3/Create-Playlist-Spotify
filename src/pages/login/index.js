// Authorization
import { ConnectAccount } from "../../Auth/api";

// Components
import Login from "../../components/login";

const LoginPage = () => {
  return <Login onClick={ConnectAccount} />;
};

export default LoginPage;

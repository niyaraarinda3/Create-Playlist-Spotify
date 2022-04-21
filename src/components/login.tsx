import "./login.css";
import Button from "@mui/material/Button";

type ButtonProps = {
  onClick(): void;
};
const Login = ({ onClick }: ButtonProps) => {
  return (
    <div className="welcome">
      <h1>&#x1F44d; Helo.. Welcome</h1>
      <Button
        variant="contained"
        color="success"
        onClick={onClick}
        className="btn"
      >
        Login
      </Button>
    </div>
  );
};

export default Login;

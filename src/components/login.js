import "./login.css";

const Login = ({ onClick }) => {
  return (
    <div className="welcome">
      <h1>&#x1F44d; Welcome Bro</h1>
      <button onClick={onClick} className="btn">
        Login
      </button>
    </div>
  );
};

export default Login;

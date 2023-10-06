import { SignIn } from "../Components/SignIn";
import "../../css/login.css";

export const Login = () => {
  const googleAuth = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };

  return (
    <>
      <div className="loginContainer">
        <h3>Вход</h3>
        <SignIn />

        <button className="googleButton" onClick={googleAuth}>
          <img
            className="googlePic"
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
            alt="google icon"
          ></img>
          <span>Sign in with Google</span>
        </button>
      </div>
    </>
  );
};

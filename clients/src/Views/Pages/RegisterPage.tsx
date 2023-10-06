import { SignUp } from "../Components/SignUp";

export const Register = () => {
  const googleAuth = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };
  return (
    <>
      <div className="loginContainer">
        <h3>Регистрация</h3>
        <SignUp />
        <button className="googleButton" onClick={googleAuth}>
          <img
            className="googlePic"
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
            alt="google icon"
          />
          <span>Sign up with Google</span>
        </button>
      </div>
    </>
  );
};

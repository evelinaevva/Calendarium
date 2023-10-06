import { Logout } from "./Logout";
import "..//../css/App.css";
import "../../css/header.css";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  function changeUserCard() {
    dispatch({ type: "SHOW/CLOSE_USER_PAGE" });
  }
  return (
    <header className="header">
      <div className="logo">
        <img src="../../../public/logo.png" alt="" />
      </div>
      <button className="headerButton" onClick={changeUserCard}>
        {user ? (
          <img
            className="headerIcon"
            src="../../../public/settings.png"
            alt="settings"
          />
        ) : (
          <img
            className="headerIcon"
            src="../../../public/enter.png"
            alt="enter"
          />
        )}
      </button>
      {user && <Logout />}
    </header>
  );
};

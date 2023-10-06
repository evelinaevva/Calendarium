import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Login } from "../Pages/LoginPage";
import { Register } from "../Pages/RegisterPage";
import { Link } from "react-router-dom";
import "../../css/userCard.css";
import "..//../css/App.css";
function UserCard() {
  const user = useSelector((state) => state.auth.user);
  const [changeAuth, setChangeAuth] = useState("login");
  const [emailNotify, setEmailNotify] = useState(false);
  const [tgNotify, setTgNotify] = useState(false);

  useEffect(() => {
    setEmailNotify(user?.settings?.emailNotify);
    setTgNotify(user?.settings?.tgNotify);
  }, [user]);

  console.log(user?.settings, emailNotify, tgNotify, "wrwerwerwer");
  function showContent() {
    if (!user) {
      return (
        <>
          <div className="userContent">
            <div>
              <button
                className="headerButtonLogin"
                onClick={() => setChangeAuth("login")}
              >
                Войти
              </button>
              <button
                className="headerButtonLogin"
                onClick={() => setChangeAuth("reg")}
              >
                Регистрация
              </button>
            </div>

            {changeAuth === "login" ? <Login /> : <Register />}
          </div>
        </>
      );
    } else {
      console.log(user);
      return (
        <div className="userContent userSettings">
          <div>{`Логин: ${user?.login}`}</div>

          <div className="radioBox">
            Оповещение по почте:
            <div className="form_toggle">
              <div className="form_toggle-item item-1">
                <input
                  id="fid-1"
                  type="radio"
                  name="radio"
                  value="off"
                  checked={!true}
                />
                <label htmlFor="fid-1">OFF</label>
              </div>
              <div className="form_toggle-item item-2">
                <input
                  id="fid-2"
                  type="radio"
                  name="radio"
                  value="on"
                  checked={emailNotify}
                />
                <label htmlFor="fid-2">ON</label>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{showContent()}</>;
}
/*  */
export default UserCard;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../css/sing.css'
import "..//../css/App.css";
export const SignUp = () => {
  const [form, setForm] = useState({
    login: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { login, email, password1, password2 } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!login || !email || !password1 || !password2) {
      toast.error("Заполните все поля", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (password1 !== password2) {
      toast.error("Пароли не совпадают", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      const userData = {
        login,
        email,
        password1,
        password2,
      };
      dispatch(register(userData));
    }
  };

  return (
    <>
      <section className="reg">
        <form onSubmit={onSubmit} className="regForm">
          <input
            type="text"
            id="login"
            name="login"
            value={login}
            placeholder="Логин"
            onChange={onChange}
          />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={onChange}
          />
          <input
            type="password"
            id="password1"
            name="password1"
            value={password1}
            placeholder="Введите пароль"
            onChange={onChange}
          />
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Подтвердите пароль"
            onChange={onChange}
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
      </section>
    </>
  );
};

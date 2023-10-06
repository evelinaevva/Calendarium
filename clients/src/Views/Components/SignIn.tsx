import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../../css/sing.css'
import "..//../css/App.css";
export const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password1: "",
  });

  const { email, password1 } = form;

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
    if (!email || !password1) {
      toast.error("Заполните все поля", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    const userData = {
      email,
      password1,
    };
    dispatch(login(userData));
  };

  return (
    <>
      <section className="reg">
        <form onSubmit={onSubmit} className="regForm">
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
            placeholder="Пароль"
            onChange={onChange}
          />
          <button type="submit">Войти</button>
        </form>
      </section>
    </>
  );
};

import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "..//../css/App.css";
export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onClick = (e) => {
    dispatch(logout());
    dispatch({type:"SHOW/CLOSE_USER_PAGE"})
  };
  return (
    <button className="headerButton" onClick={onClick} type="button">
      <img
        className="headerIcon"
        src="../../../public/exit.png"
        alt="Logout"
      ></img>
    </button>
  );
};

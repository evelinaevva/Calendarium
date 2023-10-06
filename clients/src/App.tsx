import "./css/App.css";
import "./css/userCard.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Views/Pages/HomePage";
import { Login } from "./Views/Pages/LoginPage";
import { Register } from "./Views/Pages/RegisterPage";
import { Header } from "./Views/Components/Header";
import { useEffect } from "react";
import { sessionUser } from "./store/slices/userSlice";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Dispatch, AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImgBox from "./Views/Components/ImgBox";
import UserCard from "./Views/Components/UserCard";

function App() {
  const dispatch = useDispatch();
  const img = useSelector((state) => state.taskReducer.imgTask);
  const userPage = useSelector((state) => state.styleReducer.userPage);
  useEffect(() => {
    dispatch(sessionUser());
  }, []);
  return (
    <>
      <div className={userPage ? "userPageBox" : "userPageBox hiddenBox"}>
        <UserCard />
      </div>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>

      {img && <ImgBox />}
    </>
  );
}

export default App;
function dispatch(
  arg0: AsyncThunkAction<
    any,
    void,
    {
      state?: unknown;
      dispatch?: Dispatch<AnyAction> | undefined;
      extra?: unknown;
      rejectValue?: unknown;
      serializedErrorType?: unknown;
      pendingMeta?: unknown;
      fulfilledMeta?: unknown;
      rejectedMeta?: unknown;
    }
  >
) {
  throw new Error("Function not implemented.");
}

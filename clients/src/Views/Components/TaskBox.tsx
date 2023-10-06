import { useDispatch, useSelector } from "react-redux";
import OneDay from "./OneDay";
import {
  nowDate,
} from "../../logik/calendar.logik";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { useEffect } from "react";
import HoursBar from "./HoursBar";
import "../../css/taskBox.css";
import "../../css/App.css";
import { getTask } from "../../store/slices/taskSlice";
function TaskBox() {
  const selectDate = useSelector((state) => state.dateReducer.selectDate);
  const taskDate = useSelector((state) => state.dateReducer.taskDate);
  const getAllTasks = useSelector((state) => state.taskSlice.getAllTasks);
  const user = useSelector((state) => state.auth.user);


  const [week, setWeek] = useState([0, 1, 2, 3, 4, 5, 6]);
  const dispatch = useDispatch();
  let currentDate: object;
  if (selectDate) {
    currentDate = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDay() === 0
        ? selectDate.getDate() - 6
        : selectDate.getDate() - selectDate.getDay() + 1
    );
  } else {
    currentDate = nowDate;
  }
  useEffect(() => {
    setWeek([0, 1, 2, 3, 4, 5, 6]);
  }, [selectDate]);
  useEffect(() => {
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + week[0],
      -currentDate.getTimezoneOffset() / 60
    ).toISOString();
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + week[6],
      -currentDate.getTimezoneOffset() / 60
    ).toISOString();
    dispatch(getTask({ user, startDate, endDate }));
  }, [week, getAllTasks]);
  useEffect(() => {
    setWeek([0, 1, 2, 3, 4, 5, 6]);
  }, [selectDate]);
  useEffect(() => {
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + week[0],
      -currentDate.getTimezoneOffset() / 60
    ).toISOString();
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + week[6],
      -currentDate.getTimezoneOffset() / 60
    ).toISOString();
    dispatch(getTask({ user, startDate, endDate }));
  }, [week, taskDate, user]);

  function changeWeek(n) {
    if (n) {
      if (n === "+") {
        setWeek((week) => week.map((day) => (day = day + 7)));
      } else setWeek((week) => week.map((day) => (day = day - 7)));
    }
  }

  return (
    <>
      <button className="changeWeek" onClick={() => changeWeek("-")}>
        {
          <img
            className="previousPicture"
            src="../../../public/next.png"
            alt=">"
          ></img>
        }
      </button>
      <div className="headerDays"></div>
      <div className="daysContainer">
        <>
          <HoursBar />
          {week.map((day) => {
            return (
              <OneDay
                date={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() + day
                  )
                }
              />
            );
          })}
        </>
        {taskDate && <TaskCard />}
      </div>
      <button className="changeWeek" onClick={() => changeWeek("+")}>
        {
          <img
            className="nextPicture"
            src="../../../public/next.png"
            alt=">"
          ></img>
        }
      </button>
    </>
  );
}

export default TaskBox;

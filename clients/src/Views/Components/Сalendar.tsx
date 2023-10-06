import React, { useState } from "react";

import {
  setMonthCalendar,
  nowMonth,
  nowYear,
  monthName,
  nowDateNumber,
  daysName,
} from "../../logik/calendar.logik";
import { useDispatch, useSelector } from "react-redux";

function Calendar() {
  const [year, setYear] = useState<number>(nowYear);
  const [month, setMonth] = useState<number>(nowMonth);
  const [changeMonthBool, setChangeMonthBool] = useState<boolean>(false);

  const selectDate = useSelector((state) => state.dateReducer.selectDate);

  const dispatch = useDispatch();
  function changeMonth(n: string) {
    const curDate = new Date(year, month);
    if (n === "+") {
      curDate.setMonth(curDate.getMonth() + 1);
    } else curDate.setMonth(curDate.getMonth() - 1);
    setYear(curDate.getFullYear());
    setMonth(curDate.getMonth());
  }

  function clickDate(year: number, month: number, date: number) {
    dispatch({ type: "SET_DATE", payload: new Date(year, month, date) });
    dispatch({ type: "CHANGE_BOOL", payload: false });
  }

  function changeMonthList(month: number) {
    setMonth(month);
    setChangeMonthBool(false);
  }

  return (
    <div className="calendar">
      <div className="navCalendar">
        <button
          className="switchButton"
          onClick={() => setYear((year) => (year -= 1))}
        >
          {
            <img
              className="previousPicture"
              src="../../../public/next.png"
              alt="previous"
            ></img>
          }
        </button>
        <h3>{year}</h3>
        <button
          className="switchButton"
          onClick={() => setYear((year) => (year += 1))}
        >
          {
            <img
              className="nextPicture"
              src="../../../public/next.png"
              alt="next"
            ></img>
          }
        </button>
      </div>
      <div className="navCalendar">
        <button className="switchButton" onClick={() => changeMonth("-")}>
          {
            <img
              className="previousPicture"
              src="../../../public/next.png"
              alt="previous"
            ></img>
          }
        </button>
        <h3 onClick={() => setChangeMonthBool((bool) => !bool)}>
          {monthName[month]}
        </h3>
        {changeMonthBool && (
          <ul className="changeMonth">
            {monthName.map((month, i) => {
              return <li onClick={() => changeMonthList(i)}>{month}</li>;
            })}
          </ul>
        )}
        <button className="switchButton" onClick={() => changeMonth("+")}>
          {
            <img
              className="nextPicture"
              src="../../../public/next.png"
              alt="next"
            ></img>
          }
        </button>
      </div>
      <ul className="gridBox">
        {daysName.map((el) => (
          <li key={el}>{el}</li>
        ))}
        {setMonthCalendar(year, month).map((date: number) => {
          if (date !== 0) {
            if (
              month == selectDate?.getMonth() &&
              year == selectDate?.getFullYear() &&
              date == selectDate?.getDate()
            ) {
              return (
                <li
                  onClick={() => clickDate(year, month, date)}
                  className="select-date date"
                >
                  {date}
                </li>
              );
            } else if (
              month == nowMonth &&
              year == nowYear &&
              date == nowDateNumber
            ) {
              return (
                <li
                  onClick={() => clickDate(year, month, date)}
                  className="date-now date"
                >
                  {date}
                </li>
              );
            } else if (
              year * 300 + month * 30 + date <
              nowYear * 300 + nowMonth * 30 + nowDateNumber
            ) {
              return <li className="oldDate">{date}</li>;
            } else
              return (
                <li
                  onClick={() => clickDate(year, month, date)}
                  className="date"
                >
                  {date}
                </li>
              );
          } else return <li></li>;
        })}
      </ul>
    </div>
  );
}

export default Calendar;

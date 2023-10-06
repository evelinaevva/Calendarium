import "../../css/taskBox.css";
import "..//../css/App.css";
import { useSelector } from "react-redux";
function HoursBar() {
  const {hours,minute} = useSelector((state) => state.styleReducer.hourForHoursBar);

  
  function getHour() {
    const hour = [];
    for (let i = 0; i < 24; i++) {
      hour.push(i);
    }
    return hour;
  }
  return (
    <ul className="hoursBar">
      <li className="plug"></li>
      {getHour().map((hour) => {
        return (
          <>
            <li
              className={hour === hours&&minute===0 ? "hour bakcgroundHourBar" : "hour"}
              key={hour}
            >
              <>{hour > 9 ? `${hour}:00` : `0${hour}:00`} </>
            </li>
            <li className={hour === hours&&minute===30 ? "minute bakcgroundHourBar" : "minute"}>
              {hour > 9 ? `${hour}:30` : `0${hour}:30`}
            </li>
          </>
        );
      })}
    </ul>
  );
}

export default HoursBar;

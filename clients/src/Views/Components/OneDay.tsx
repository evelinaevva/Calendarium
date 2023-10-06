import "../../css/oneDay.css";
import "..//../css/App.css";
import {
  monthNameSyffix,
  daysNameStartSunSuf,
} from "../../logik/calendar.logik";
import { useDispatch, useSelector } from "react-redux";
import OneTask from "./OneTask";

function OneDay({ date }) {

  const dispatch = useDispatch();
  const selectDate = useSelector((state) => state.dateReducer.selectDate);
  const tasks = useSelector((state) => state.taskSlice.task);
  const user = useSelector((state) => state.auth.user);

  function getTask(hour: number, minute: number) {
    dispatch({ type: "CHANGE_BOOL", payload: true });
    dispatch({
      type: "SET_TASK_DATE",
      payload: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hour,
        minute
      ),
    });
  }

  function getHour() {
    const hour = [];
    for (let i = 0; i < 24; i++) {
      hour.push(i);
    }
    return hour;
  }

  const tasksForServer = [
    {
      id: 1,
      userId: "1",
      title: "Купить хлебушек",
      textContent: "Желательно свежий",
      targetDateTime: "2023-08-17T12:00:00.000Z",
      duration: 60,
      reccuring: true,
      offsetNotify: 0,
      scheduler: {
        id: 1,
        taskId: 1,
        dayOfWeek: "",
        reccurenceTypeId: 1,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
      schedulerArr: [
        "2023-08-17",
        "2023-08-18",
        "2023-08-19",
        "2023-08-20",
        "2023-08-21",
        "2023-08-22",
        "2023-08-23",
        "2023-08-24",
        "2023-08-25",
        "2023-08-26",
        "2023-08-27",
        "2023-08-28",
        "2023-08-29",
        "2023-08-30",
        "2023-08-31",
        "2023-09-01",
        "2023-09-02",
        "2023-09-03",
        "2023-09-04",
        "2023-09-05",
        "2023-09-06",
        "2023-09-07",
        "2023-09-08",
        "2023-09-09",
        "2023-09-10",
        "2023-09-11",
      ],
    },
    {
      id: 2,
      userId: "1",
      title: "Сделать ТО автомобилю",
      textContent: "Заменить масло, фильтры",
      targetDateTime: "2023-08-16T14:00:00.000Z",
      duration: 90,
      reccuring: true,
      offsetNotify: 0,
      scheduler: {
        id: 2,
        taskId: 2,
        dayOfWeek: "",
        reccurenceTypeId: 2,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
      schedulerArr: [
        "2023-08-16",
        "2023-08-23",
        "2023-08-30",
        "2023-09-06",
        "2023-09-13",
      ],
    },
    {
      id: 3,
      userId: "1",
      title: "тест",
      textContent: "тест тест тест тест тест",
      targetDateTime: "2023-08-16T18:30:00.000Z",
      duration: 120,
      reccuring: true,
      offsetNotify: 0,
      scheduler: {
        reccurenceTypeId: 2,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
      schedulerArr: [
        "2023-08-16",
        "2023-08-22",
        "2023-08-31",
        "2023-09-06",
        "2023-09-13",
      ],
    },
  ];

  function taskForDay() {
    const dayTasks = [];
    if (tasks) {
      tasks.map((task) => {
        const targetDate = new Date(task.targetDateTime);
        const taskDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          targetDate.getHours(),
          targetDate.getMinutes()
        );
        if (
          !task.reccuring
            ? targetDate.getTime() === taskDate.getTime()
            : task.schedulerArr.includes(taskDate.toISOString())
        ) {
          const currentTask = {
            id: task.id,
            name: task.title,
            text: task.textContent,
            time: targetDate,
            imgContent: task.imgContent,
            duration: task.duration,
            scheduler: task.scheduler,
            offsetNotify: task.offsetNotify,
            reccuring: task.reccuring,
            style: {
              position: "absolute",
              fontSize: "15px",
              width: "100%",
              height: `${task.duration * 0.76}px`,
            },
          };
          dayTasks.push(currentTask);
        }
      });
    }
    return dayTasks;
  }

  function showTask(hour, minute) {
    if (user) {
      const task = taskForDay().map((task) => {
        if (
          task.time.getHours() === hour &&
          task.time.getMinutes() === minute
        ) {
          return <OneTask task={task} />;
        }
      });
      return task.filter((el) => el);
    }
  }

  function getBg() {
    if (
      date?.getFullYear() === selectDate?.getFullYear() &&
      date?.getMonth() === selectDate?.getMonth() &&
      date?.getDate() === selectDate?.getDate()
    ) {
      return true;
    } else false;
  }
  function pointerLeave() {
    dispatch({ type: "REMOVE_HOURBAR" });
  }
  function pointerEnter(hours, minute) {
    dispatch({ type: "SET_HOURBAR", payload: { hours, minute } });
  }
  return (
    <>
      <div className="dayContainer">
        <div className="daysDate">{`${
          daysNameStartSunSuf[date.getDay()]
        } ${date.getDate()} ${monthNameSyffix[date.getMonth()]}`}</div>
        <ul className="hourList">
          {getHour().map((hour) => {
            return (
              <li key={hour}>
                <div className={getBg() ? "sector showBg" : "sector"}>
                  <div
                    className="sectorPart"
                    onPointerLeave={pointerLeave}
                    onPointerEnter={() => pointerEnter(hour, 0)}
                    onClick={() =>
                      showTask(hour, 0).length > 0 ? "" : getTask(hour, 0)
                    }
                  >
                    {showTask(hour, 0)}
                  </div>
                  <div
                    className="sectorPart"
                    onPointerLeave={pointerLeave}
                    onPointerEnter={() => pointerEnter(hour, 30)}
                    onClick={() =>
                      showTask(hour, 30).length > 0 ? "" : getTask(hour, 30)
                    }
                  >
                    {showTask(hour, 30)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default OneDay;

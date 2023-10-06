import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/taskCard.css";
import { daysNameStartSun, monthNameSyffix } from "../../logik/calendar.logik";
import { addTask, redTask } from "../../store/slices/taskSlice";
import "..//../css/App.css";
function TaskCard() {
  const updateTask = useSelector((state) => state.taskReducer.updateTask);
  const user = useSelector((state) => state.auth.user);
  const [form, setForm] = useState({
    title: updateTask?.name || "",
    textContent: updateTask?.text || "",
    duration: updateTask?.duration || 30,
    reccuring: updateTask?.reccuring || false,
    offsetNotify: updateTask?.offsetNotify || 0,
  });
  const [file, setFile] = useState(null);

  const [showDuration, setShowDuration] = useState(false);
  const [showDayOfWeek, setShowDayOfWeek] = useState(false);
  const [reccurenceType, setReccurenceType] = useState(
    updateTask?.scheduler.reccurenceTypeId || 0
  );
  const [dayOfWeek, setDayOfWeek] = useState({
    mon: updateTask?.scheduler?.mon || false,
    tue: updateTask?.scheduler?.tue || false,
    wed: updateTask?.scheduler?.wed || false,
    thu: updateTask?.scheduler?.thu || false,
    fri: updateTask?.scheduler?.fri || false,
    sat: updateTask?.scheduler?.sat || false,
    sun: updateTask?.scheduler?.sun || false,
  });

  const dispatch = useDispatch();
  const taskDate = useSelector((state) => state.dateReducer.taskDate);

  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { title, textContent, duration, reccuring, offsetNotify } = form;
    const task = {
      id: updateTask?.id || null,
      userId: user.id,
      title: title,
      textContent: textContent,
      targetDateTime: taskDate,
      duration: +duration,
      reccuring: reccuring,
      offsetNotify: +offsetNotify,
      scheduler: {
        reccurenceTypeId: reccurenceType,
        mon: dayOfWeek.mon,
        tue: dayOfWeek.tue,
        wed: dayOfWeek.wed,
        thu: dayOfWeek.thu,
        fri: dayOfWeek.fri,
        sat: dayOfWeek.sat,
        sun: dayOfWeek.sun,
      },
    };
    console.log(reccurenceType, "na server");
    const formForServer = new FormData();
    if (file) {
      formForServer.append("file", file);
    }

    formForServer.append("task", JSON.stringify(task));

    updateTask
      ? dispatch(redTask(formForServer))
      : dispatch(addTask(formForServer));
    dispatch({ type: "REMOVE_TASK_DATE" });
    dispatch({ type: "REMOVE_UPDATE_TASK" });
  };

  function sheduler(e) {
    switch (e.target.value) {
      case "none":
        setForm((prevState) => ({
          ...prevState,
          reccuring: false,
        }));
        setShowDayOfWeek(false);
        setReccurenceType(0);
        break;
      case "dayOfWeek":
        setReccurenceType(0);
        setShowDayOfWeek(true);
        setForm((prevState) => ({
          ...prevState,
          reccuring: true,
        }));
        break;
      case "daily":
        setShowDayOfWeek(false);
        setForm((prevState) => ({
          ...prevState,
          reccuring: true,
        }));
        setReccurenceType(1);

        break;
      case "weekly":
        setShowDayOfWeek(false);
        setForm((prevState) => ({
          ...prevState,
          reccuring: true,
        }));
        setReccurenceType(2);
        break;
      case "monthly":
        setShowDayOfWeek(false);
        setForm((prevState) => ({
          ...prevState,
          reccuring: true,
        }));
        setReccurenceType(3);
        console.log("monthly");
        break;
      case "annualy":
        setShowDayOfWeek(false);
        setForm((prevState) => ({
          ...prevState,
          reccuring: true,
        }));
        setReccurenceType(4);
        console.log("annualy");
        break;
      default:
        break;
    }
  }

  function changeDayOfWeek(e) {
    const bool = !dayOfWeek?.[e.target.name];
    setDayOfWeek((prevState) => ({
      ...prevState,
      [e.target.name]: bool,
    }));
  }
  function closeBtn() {
    dispatch({ type: "REMOVE_UPDATE_TASK" });
    dispatch({ type: "REMOVE_TASK_DATE" });
  }
  function uploadImg(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }
  return (
    <div className={taskDate ? "taskCard" : "taskCard closeCard"}>
      <div>
        <span>{`${
          daysNameStartSun[taskDate?.getDay()]
        } ${taskDate?.getDate()} ${
          monthNameSyffix[taskDate?.getMonth()]
        } ${`${taskDate?.getFullYear()} года `} `}</span>
        <span>{` ${`${taskDate?.getHours()}:${
          taskDate?.getMinutes() === 0
            ? `${taskDate?.getMinutes()}0`
            : taskDate?.getMinutes()
        }`} `}</span>
      </div>

      <button className="close" onClick={closeBtn}>
        <img
          className="closePic"
          src="../../../public/close.png"
          alt="close"
        ></img>
      </button>
      <form onSubmit={onSubmit}>
        <input
          className="inp"
          type="text"
          placeholder="Заголовок"
          name="title"
          value={form.title}
          onChange={onChange}
        />
        <textarea
          className="inp textarea"
          placeholder="Введите задачу"
          name="textContent"
          onChange={onChange}
          value={form.textContent}
        />
        <div className="uploadInput">
          <label htmlFor="img">Добавить фото</label>
          <br />
          <input onChange={uploadImg} type="file" name="file" id="file" />
          <br />
        </div>
        <label htmlFor="duration">Продолжительность</label>
        <select
          className="selectRepeat"
          name="duration"
          id="duration"
          onChange={onChange}
        >
          <option value="30">Полчаса</option>
          <option value="60">Час</option>
          <option value="90">Полтора часа</option>
          <option value="120">Два</option>
          <option value="150">Два с половиной</option>
        </select>
        <label htmlFor="repeat">Повтор</label>
        <select
          onChange={sheduler}
          className="selectRepeat"
          name="repeat"
          id="repeat"
        >
          <option value="none">Никогда</option>
          <option value="dayOfWeek">Выбрать дни</option>
          <option value="daily">Каждый день</option>
          <option value="weekly">Каждую неделю</option>
          <option value="monthly">Каждый месяц</option>
          <option value="annualy">Каждый год</option>
        </select>
        {showDayOfWeek && (
          <div className="DayOfWeek">
            <div>
              <input
                className="notifyCheckbox"
                type="checkbox"
                name="mon"
                checked={dayOfWeek.mon}
                onChange={changeDayOfWeek}
              />
              <label className="alarm" htmlFor="mon">
                Пн
              </label>
            </div>
            <div>
              <input
                className="notifyCheckbox"
                type="checkbox"
                name="tue"
                checked={dayOfWeek.tue}
                onChange={changeDayOfWeek}
              />
              <label className="alarm" htmlFor="tue">
                Вт
              </label>
            </div>
            <div>
              <input
                className="notifyCheckbox"
                type="checkbox"
                name="wed"
                checked={dayOfWeek.wed}
                onChange={changeDayOfWeek}
              />
              <label className="alarm" htmlFor="wed">
                Ср
              </label>
            </div>
            <div>
              <input
                className="notifyCheckbox"
                type="checkbox"
                name="thu"
                checked={dayOfWeek.thu}
                onChange={changeDayOfWeek}
              />
              <label className="alarm" htmlFor="thu">
                Чт
              </label>
            </div>
            <div>
              <input
                className="notifyCheckbox"
                type="checkbox"
                name="fri"
                checked={dayOfWeek.fri}
                onChange={changeDayOfWeek}
              />
              <label className="alarm" htmlFor="fri">
                Пт
              </label>
            </div>
            <div>
              <input
                className="notifyCheckbox"
                type="checkbox"
                name="sat"
                checked={dayOfWeek.sat}
                onChange={changeDayOfWeek}
              />
              <label className="alarm" htmlFor="sat">
                Сб
              </label>
            </div>
            <div>
              <input
                className="notifyCheckbox"
                type="checkbox"
                name="sun"
                checked={dayOfWeek.sun}
                onChange={changeDayOfWeek}
              />
              <label className="alarm" htmlFor="sun">
                Вс
              </label>
            </div>
          </div>
        )}
        <div>
          <input
            className="notifyCheckbox"
            type="checkbox"
            name="onDuration"
            checked={showDuration}
            onChange={() => setShowDuration(!showDuration)}
          />
          <label className="alarm" htmlFor="onDuration">
            Уведомление
          </label>
          <br />
          <span className={!showDuration && "spanHidden"}>Уведомить за:</span>
          {!showDuration ? (
            <input
              className="durationInp"
              type="number"
              name="duration"
              disabled
            />
          ) : (
            <input
              className="durationInp"
              type="number"
              name="offsetNotify"
              onChange={onChange}
            />
          )}
          <span className={!showDuration && "spanHidden"}>минут</span>
        </div>
        {updateTask ? (
          <button className="taskButton" type="submit">
            Принять изменения
          </button>
        ) : (
          <button className="taskButton" type="submit">
            Добавить задачу
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskCard;

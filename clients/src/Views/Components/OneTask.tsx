import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delTask } from "../../store/slices/taskSlice";
import "..//../css/App.css";
function OneTask({ task }) {
  const dispatch = useDispatch();

  const [bool, setBool] = useState(false);
  const [re, setRe] = useState(null);
  const [rebootEf, setRebootEf] = useState(false);
  const ref = useRef();
  useEffect(() => {
    setRe(ref.current.getBoundingClientRect());
  }, [rebootEf]);
  function clickDiv() {
    setBool(!bool);
    setRebootEf(!bool);
  }

  function update() {
    dispatch({ type: "UPDATE_TASK", payload: task });
    dispatch({ type: "SET_TASK_DATE", payload: task.time });
    setBool(!bool);
  }
  function del() {
    dispatch(delTask(task.id));
    setBool(!bool);
  }
  function showImg() {
    dispatch({
      type: "UPDATE_IMG",
      payload: `http://localhost:5000/img/${task.imgContent}`,
    });
  }
  return (
    <>
      <div
        ref={ref}
        onClick={clickDiv}
        className={bool ? "taskWindow bgTaskWindow" : "taskWindow"}
        key={task.id}
        style={task.style}
      >
        {`${task.name}`}
      </div>
      <div
        className={
          bool
            ? window.innerWidth / re.x > 1.8
              ? "taskInfo taskInfoLeft "
              : "taskInfo taskInfoRight"
            : "hiddenTaskInfo"
        }
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="taskName">{` ${task.name}`}</div>
          <div className="linkBox">
            <img
              onClick={update}
              className="imgLink"
              src="../../../public/red.png"
              alt=""
            />
            <img
              onClick={del}
              className="imgLink"
              src="../../../public/dell.png"
              alt=""
            />
          </div>
        </div>
        <div>{` ${task.text}`}</div>
        <div>{` ${task.time.getFullYear()}-${
          task.time.getMonth() + 1
        }-${task.time.getDate()} ${task.time.getHours()}:${
          task.time.getMinutes() !== 0
            ? task.time.getMinutes()
            : `${task.time.getMinutes()}0`
        }`}</div>
        {task.imgContent && (
          <div onClick={showImg} className="imgContent">
            <img
              src={`http://localhost:5000/img/${task.imgContent}`}
              alt="noImg"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default OneTask;

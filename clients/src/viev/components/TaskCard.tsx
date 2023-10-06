import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/taskCard.css";
import {
  daysNameStartSun,
  monthNameSyffix
} from "../../logik/calendar.logik";
import { addTask } from "../../redux/task.actions";


function TaskCard() {
  const [form, setForm] = useState({
    title: "",
    textContent: "",
    duration: 0,
    reccuring: false,
    offsetNotify: 30,
  });
  const [showDuration, setShowDuration] = useState(false);

  const dispatch = useDispatch();
  const taskDate = useSelector((state) => state.dateReducer.taskDate);
  const selectDate = useSelector((state) => state.dateReducer.selectDate);
  
  
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
      userId: 1,
      title: title,
      textContent: textContent,
      targetDateTime: taskDate,
      duration: 60,
      reccuring: reccuring,
      offsetNotify: offsetNotify,
    };
    dispatch(addTask(task));
    dispatch({type:"REMOVE_TASK_DATE"})
  };


  return (
    <div className={taskDate?"taskCard":"taskCard closeCard"}>
      <div>
      <span>{`${
          daysNameStartSun[taskDate?.getDay()]
        } ${
          taskDate?.getDate()
        } ${
          monthNameSyffix [taskDate?.getMonth()]
        } ${`${taskDate?.getFullYear()} года `} `}</span>
        <span>{` ${`${taskDate?.getHours()}:${
          taskDate?.getMinutes() === 0
            ? `${taskDate?.getMinutes()}0`
            : taskDate?.getMinutes()
        }`} `}</span>
      </div>
 
      <button className="close" onClick={()=>dispatch({type:"REMOVE_TASK_DATE"})}>X</button>
      <form onSubmit={onSubmit}>
        <input
          className="inp"
          type="text"
          placeholder="Заголовок"
          name="title"
          onChange={onChange}
        />
        <textarea
          className="inp textarea"
          placeholder="Введите задачу"
          name="textContent"
          onChange={onChange}
        />
        
        <label htmlFor="img">Добавить фото</label><br/>
        <input type="file" name="img"/>
         <label htmlFor="duration">Продолжительность</label>
        <select className="selectRepeat" name="duration" id="repeat">
          <option value="0">Не указывать</option>
          <option value='30' >Полчаса</option>
          <option value="60">Час</option>
          <option value="90">Полтора часа</option>
          <option value="120">Два</option>
          <option value="150">Два с половиной</option>
        </select>
        <label htmlFor="repeat">Повтор</label>
        <select className="selectRepeat" name="repeat" id="repeat">
          <option value="none">Никогда</option>
          <option value="everyDay">Каждый день</option>
          <option value="everyDayNotWeekend">Каждый день кроме выходных</option>
          <option value="changeDay">Выбрать дни</option>
          <option value="everyWeek">Каждую неделю</option>
          <option value="everyMonth">Каждый месяц</option>
          <option value="everyYear">Каждый год</option>
        </select>
        <div>
          <div></div>
          <input
            type="checkbox"
            name="onDuration"
            checked={showDuration}
            onChange={() => setShowDuration(!showDuration)}
          />
          <label htmlFor="onDuration">Уведомление</label>
          <br />
          {!showDuration ? (
            <input
              type="number"
              name="duration"
              disabled
              placeholder="Уведомить за:"
            />
          ) : (
            <input type="number" name="duration" onChange={onChange} />
          )}
        </div>
        <button type="submit">Добавить задачу</button>
      </form>
    </div>
  );
}

export default TaskCard;

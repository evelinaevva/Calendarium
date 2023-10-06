const db = require("./db/models");

async function findUser(email) {
  const user = await db.User.findOne({ where: { email: email } });
  return user;
}

const p = {
  userId: 1,
  title: "task test",
  textContent: "wefwefwefewf",
  targetDateTime: "123444",
  duration: "30",
  reccuring: true,
  offsetNotify: "30",
};

async function t(p) {
  const task = await db.Task.create({ ...p });
}

async function tt() {
  const defaultSchedulerSettings = {
    dayOfWeek: "",
    reccurenceTypeId: 9,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  };
  const schedile = await db.Scheduler.create({
    ...defaultSchedulerSettings,
    taskId: 6,
  });
}

async function getAllTasks(userId) {
  const task = await db.Task.findAll({
    where: { userId: userId },
    include: [{ model: db.Scheduler }],
  });
  return task;
}

function getScheduleData(task, beginDate, endDate) {
  const lastDate = new Date(2024, 0, 1);

  const reccurenceType = ["daily", "weekly", "monthly", "annualy"];
  const data = [];
  type = 1;
  let nextDate = new Date(beginDate);
  do {
    switch (reccurenceType[type]) {
      case "daily":
        nextDate.setDate(nextDate.getDate() + 1);
        data.push(new Date(nextDate));
        break;

      case "weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        data.push(new Date(nextDate));
        break;

      case "monthly":
        nextDate.setMonth(nextDate.getMonth() + 1);
        data.push(new Date(nextDate));
        break;
      case "annualy":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        data.push(new Date(nextDate));
        break;

      default:
        data.push(lastDate);
        break;
    }
  } while (
    nextDate.getTime() <= endDate.getTime() &&
    nextDate.getTime() <= lastDate.getTime()
  );
  return data;
}

const offset = 1440;
const t1 = new Date("2023-08-17T15:00:00.000Z");
const t2 = new Date("2023-08-20T13:00:00.000Z");
const t3 = new Date(
  t2.getFullYear(),
  t2.getMonth(),
  t2.getDate(),
  t2.getHours(),
  t2.getMinutes()
);
const t4 = new Date(t3.setMinutes(t3.getMinutes() + offset));

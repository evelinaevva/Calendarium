export const nowDate = new Date();
export const nowDateNumber = nowDate.getDate();
export const nowMonth = nowDate.getMonth();
export const nowYear = nowDate.getFullYear();
export const monthName = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
export const monthNameSyffix = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];
export const daysNameStartSunSuf = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
export const daysName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
export const daysNameStartSun = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
export function setMonthCalendar(year: number, month: number) {
  const monthDays = new Date(year, month + 1, 0).getDate(),
    monthPrefix = new Date(year, month, 0).getDay(),
    monthDaysArr = [];

  if (monthPrefix > 0) {
    for (let i = 1; i <= monthPrefix; i++) {
      monthDaysArr.push(0);
    }
  }

  for (let i = 1; i <= monthDays; i++) {
    monthDaysArr.push(i);
  }

  return monthDaysArr;
}

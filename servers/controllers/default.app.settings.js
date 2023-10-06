module.exports = {
  // шаблон по умолчанию для таблицы расписаний
  defaultSchedulerSettings: {
    dayOfWeek: '', 
    reccurenceTypeId: 2, 
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  },
  // параметры пользователя по умолчанию
  defaultUserSettings: {
    tgNotify: false, 
    emailNotify: true, 
    timezoneId: 2
  },
  // крайняя дата для расписания
  lastScheduleDate: new Date(2040, 0, 1),
  // типы повторений для расписания
  // dayOfWeek - активный чек-бокс для дня недели
  // daily - ежедневно
  // weekly - еженедельно
  // monthly - ежемесячно
  // annualy - ежегодно
  reccurenceType: ['dayOfWeek','daily','weekly', 'monthly', 'annualy']
};

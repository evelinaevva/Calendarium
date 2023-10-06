'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Tasks', [
      {
        userId: 1,
        title: 'Купить хлебушек',
        textContent: 'Желательно свежий',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 27, 15, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 27, 15, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: true,
        messageSent: false,
        emailSent: false,
        imgContent: '1692699990915-7191209326241907.png',  
        offsetNotify: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: 'Сделать ТО автомобилю',
        textContent: 'Заменить масло, фильтры',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 27, 21, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 27, 21, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: true,
        messageSent: false,
        emailSent: false,
        imgContent: '1692700000087-9322382365761878.png',
        offsetNotify: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        title: 'Оплатить ЖКХ',
        textContent: 'Оплатить газ, свет, воду',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 27, 23, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 27, 23, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: false,
        messageSent: false,
        emailSent: false,
        imgContent: '1692700000087-9322382365761878.png',
        offsetNotify: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        title: 'Сделать ТО автомобилю',
        textContent: 'Заменить масло, фильтры',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 27, 15, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 27, 15, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: true,
        messageSent: false,
        imgContent: '1692699990915-7191209326241907.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Обучение сотрудников по новому корпоративному ПО.',
        textContent: 'Обучение сотрудников по новому корпоративному ПО.',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 28, 10, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 28, 10, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: true,
        messageSent: false,
        imgContent: '1692699990915-7191209326241907.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Аудит безопасности IT-системы.',
        textContent: 'Проанализировать уязвимости и риски в IT-инфраструктуре, предпринять меры по устранению обнаруженных проблем.',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 28, 14, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 28, 14, 0, 0, 0).toUTCString(),
        duration: 90,
        reccuring: true,
        messageSent: false,
        imgContent: '90b02dcc-85ad-42e7-b13f-4ffd17f39369.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Запуск нового продукта',
        textContent: 'Подготовить маркетинговую кампанию, провести онлайн-презентацию продукта, начать прием заказов',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 29, 9, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 29, 9, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: true,
        messageSent: false,
        imgContent: '1692699990915-7191209326241907.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Планирование бюджета на следующий финансовый год.',
        textContent: 'Подготовить маркетинговую кампанию, провести онлайн-презентацию продукта, начать прием заказов',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 29, 11, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 29, 11, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: true,
        messageSent: false,
        imgContent: '90b02dcc-85ad-42e7-b13f-4ffd17f39369.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Тимбилдинговое мероприятие.',
        textContent: 'Организовать выездную активность для команды с целью укрепления доверия, коммуникации и сотрудничества.в',
        imgContent: null,
        targetDateTime: new Date(2023, 8, 1, 10, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 8, 1, 10, 0, 0, 0).toUTCString(),
        duration: 120,
        reccuring: true,
        messageSent: false,
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Внедрение новой системы управления проектами.',
        textContent: 'Установить и настроить ПО для управления проектами, провести тренинги с сотрудниками по его использованию.',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 30, 15, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 30, 15, 0, 0, 0).toUTCString(),
        duration: 90,
        reccuring: true,
        messageSent: false,
        imgContent: '1d65aa4f-a1a2-435f-a747-451dcae75622.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Конференция по инновациям в отрасли',
        textContent: 'Принять участие в международной конференции, выступить с презентацией о последних тенденциях и достижениях.',
        imgContent: null,
        targetDateTime: new Date(2023, 8, 1, 14, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 8, 1, 14, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: true,
        messageSent: false,
        imgContent: '1692699990915-7191209326241907.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Пересмотр стратегии обслуживания клиентов',
        textContent: 'Провести совещание с отделами продаж и поддержки, обсудить текущие подходы и разработать новые методы улучшения обслуживания клиентов.',
        imgContent: null,
        targetDateTime: new Date(2023, 8, 1, 16, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 8, 1, 16, 0, 0, 0).toUTCString(),
        duration: 30,
        reccuring: true,
        messageSent: false,
        imgContent: '1d65aa4f-a1a2-435f-a747-451dcae75622.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Планерка',
        textContent: 'Планерка с сотрудниками отдела',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 28, 9, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 28, 9, 0, 0, 0).toUTCString(),
        duration: 30,
        reccuring: true,
        messageSent: false,
        imgContent: '90b02dcc-85ad-42e7-b13f-4ffd17f39369.png', 
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Отдать машину в сервис',
        textContent: 'ул. Некрасова, 17Г',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 31, 11, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 31, 11, 0, 0, 0).toUTCString(),
        duration: 30,
        reccuring: true,
        messageSent: false,
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: 'Создать платежки',
        textContent: 'Выставить счет по договору о тех поддержке',
        imgContent: null,
        targetDateTime: new Date(2023, 7, 31, 14, 0, 0, 0).toUTCString(),
        notificationTime: new Date(2023, 7, 31, 14, 0, 0, 0).toUTCString(),
        duration: 60,
        reccuring: true,
        messageSent: false,
        emailSent: false,
        offsetNotify: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
 
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Tasks', null, {});

  }
};
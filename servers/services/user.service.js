const { User, Setting } = require('../db/models/');
const {Op } = require('sequelize');

class UserService {
  async getUser(id) {
    const user = await User.findByPk(id);

    return user;
  }
  
  async findUser(email) {
    const user = await User.findOne({ where: { email: email } });
    return user;
  }

  async createUser(params, hash) {
    const user = await User.create({ ...params, password: hash});
    return user;
  }

   // получить пользователей и его настройки 
  async getAllUsers() {
    const users = await User.findAll({
      include: [
        { model: Setting, 
          where: {
            tgChatId : {[Op.not]: null }
          }
        },
      ],
    });
    return users;
  }

}

module.exports = new UserService();

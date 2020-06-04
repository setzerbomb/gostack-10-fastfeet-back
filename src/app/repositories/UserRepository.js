import User from '../models/User';

class UserRepository {
  async create(data) {
    return await User.create(data);
  }

  async findOne(query) {
    return await User.findOne(query);
  }

  async findByPk(id) {
    return await User.findByPk(id);
  }

  async findAll(query) {
    return await User.findAll(query);
  }

  async delete() {}

  async findUserByEmail(email) {
    return await User.findOne({
      where: {
        email,
      },
    });
  }
}

export default new UserRepository();

import UserRepository from '../repositories/UserRepository';
import message from '../common/message';

class UserController {
  async store(req, res) {
    if (await UserRepository.findUserByEmail(req.body.email)) {
      return message(res, 400, 'User already exists');
    }

    const { id, name, email, provider } = await UserRepository.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await UserRepository.findByPk(req.userID);

    if (email && email !== user.email) {
      if (await UserRepository.findUserByEmail(email)) {
        return message(res, 400, 'User already exists');
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return message(res, 401, 'Password does not match');
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();

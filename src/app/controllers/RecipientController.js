import Recipient from '../models/Recipient';
import message from '../common/message';

class RecipientController {
  async store(req, res) {
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      postal_code,
    } = await Recipient.create(req.body);

    res.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      postal_code,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return message(res, 401, 'Recipient not found');
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      postal_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      postal_code,
    });
  }
}

export default new RecipientController();

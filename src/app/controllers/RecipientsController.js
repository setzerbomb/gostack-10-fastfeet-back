import Recipients from '../models/Recipients';
import message from '../common/message';

class RecipientsController {
  async store(req, res) {
    const recipient = await Recipients.create(req.body);

    res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;

    const recipient = await Recipients.findByPk(id);

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

export default new RecipientsController();

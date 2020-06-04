import DeliveryMenRepository from '../repositories/DeliveryMenRepository';
import message from '../common/message';

class DeliveryMenController {
  async list(req, res, next) {
    const deliveryMen = await DeliveryMenRepository.findAll();

    res.json(deliveryMen);
  }

  async store(req, res) {
    if (await DeliveryMenRepository.findDeliveryMenByEmail(req.body.email)) {
      return message(res, 400, 'Delivery man already exists');
    }

    const { id, name, email, avatar } = await DeliveryMenRepository.create(
      req.body
    );

    return res.json({ id, name, email, avatar });
  }

  async update(req, res) {
    const { id } = req.params;
    const { email } = req.body;

    const deliveryMan = await DeliveryMenRepository.findByPk(id);

    if (email && email !== deliveryMan.email) {
      if (await DeliveryMenRepository.findDeliveryMenByEmail(email)) {
        return message(res, 400, 'Delivery man already exists');
      }
    }

    const { name, avatar } = await deliveryMan.update(req.body);

    return res.json({ id, name, email, avatar });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryMenRepository.findByPk(id);

    deliveryMan.destroy();

    return message(res, 204, '');
  }
}

export default new DeliveryMenController();

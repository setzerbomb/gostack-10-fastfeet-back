import DeliveryManRepository from '../repositories/DeliveryManRepository';
import message from '../common/message';

class DeliveryManController {
  async list(req, res, next) {
    const deliveryMan = await DeliveryManRepository.findAll();

    res.json(deliveryMan);
  }

  async store(req, res) {
    if (await DeliveryManRepository.findDeliveryManByEmail(req.body.email)) {
      return message(res, 400, 'Delivery man already exists');
    }

    const { id, name, email, avatar } = await DeliveryManRepository.create(
      req.body
    );

    return res.json({ id, name, email, avatar });
  }

  async update(req, res) {
    const { id } = req.params;
    const { email } = req.body;

    const deliveryMan = await DeliveryManRepository.findByPk(id);

    if (!deliveryMan) {
      return message(res, 400, 'Delivery men not found');
    }

    if (email && email !== deliveryMan.email) {
      if (await DeliveryManRepository.findDeliveryManByEmail(email)) {
        return message(res, 400, 'Delivery man already exists');
      }
    }

    const { name, avatar } = await deliveryMan.update(req.body);

    return res.json({ id, name, email, avatar });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryManRepository.findByPk(id);

    if (!deliveryMan) {
      return message(res, 400, 'Delivery men not found');
    }

    deliveryMan.destroy();

    return message(res, 204, 'Delivery man deleted', false);
  }
}

export default new DeliveryManController();

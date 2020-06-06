import Delivery from '../models/Delivery';
import message from '../common/message';

import Queue from '../../lib/Queue';
import CanceledDeliveryMail from '../jobs/CanceledDeliveryMail';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';

class DistributorController {
  async update(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'state',
            'city',
            'postal_code',
          ],
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
      attributes: ['id', 'product'],
    });

    if (!delivery) {
      return message(res, 400, 'Delivery not found');
    }

    await Queue.add(CanceledDeliveryMail.key, {
      delivery,
    });

    await delivery.update({ canceled_at: new Date() });

    return message(res, 200, 'Delivery canceled', false);
  }
}

export default new DistributorController();

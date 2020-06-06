import Delivery from '../models/Delivery';
import { isBefore, parseISO } from 'date-fns';

import Queue from '../../lib/Queue';
import PickupDeliveryMail from '../jobs/PickupDeliveryMail';

import message from '../common/message';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryController {
  async list(req, res, next) {
    const delivery = await Delivery.findAll();

    res.json(delivery);
  }

  async store(req, res) {
    const { id } = await Delivery.create(req.body);

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
      attributes: [
        'id',
        'product',
        'isPickable',
        'start_date',
        'end_date',
        'canceled_at',
      ],
    });

    await Queue.add(PickupDeliveryMail.key, {
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (req.body.end_date && !(delivery.start_date || req.body.start_date)) {
      return message(
        res,
        401,
        'You cannot finish a delivery that have not been started '
      );
    }

    if (req.body.end_date) {
      const start = delivery.start_date || req.body.start_date;
      if (isBefore(parseISO(req.body.end_date), parseISO(start))) {
        return message(
          res,
          401,
          'You cannot finish a delivery before it start'
        );
      }
    }

    const {
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = await delivery.update(req.body);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return message(res, 400, 'Delivery not found');
    }

    delivery.destroy();

    return message(res, 204, 'Delivery deleted', false);
  }
}

export default new DeliveryController();

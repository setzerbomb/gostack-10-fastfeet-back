import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import { Op } from 'sequelize';
import { isBefore, parseISO, startOfDay, endOfDay } from 'date-fns';
import message from '../common/message';

class DeliveryManDeliveriesController {
  async list(req, res, next) {
    const { id } = req.params;
    const { page = 1, filter } = req.query;

    const query =
      filter !== 'caught'
        ? filter !== 'collect'
          ? {
              deliveryman_id: id,
              canceled_at: null,
              end_date: null,
              start_date: null,
            }
          : {
              deliveryman_id: id,
              canceled_at: null,
              end_date: null,
            }
        : {
            deliveryman_id: id,
            canceled_at: null,
            end_date: null,
            start_date: { [Op.ne]: null },
          };

    const deliveries = await Delivery.findAll({
      where: query,
      order: ['created_at'],
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      limit: 10,
      offset: (page - 1) * 10,
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
            'complement',
          ],
        },
      ],
    });

    res.json(deliveries);
  }

  async deliver(req, res) {
    const { delivery: d, deliveryMan: dm } = req.params;
    const { end_date, signature_id } = req.body;

    const delivery = await Delivery.findOne({
      where: { id: d, deliveryman_id: dm },
    });

    if (!delivery) {
      return message(res, 400, 'Delivery not found');
    }

    if (delivery.end_date) {
      return message(res, 401, 'You cannot update a finished delivery');
    }

    if (delivery.canceled_at) {
      return message(res, 401, 'You cannot update a canceled delivery');
    }

    if (end_date && !delivery.start_date) {
      return message(
        res,
        401,
        'You cannot finish a delivery that have not been started '
      );
    }

    if (end_date) {
      if (isBefore(parseISO(end_date), parseISO(delivery.start_date))) {
        return message(
          res,
          401,
          'You cannot finish a delivery before it start'
        );
      }
    }

    const {
      id,
      recipient_id,
      deliveryman_id,
      product,
      canceled_at,
      start_date,
    } = await delivery.update({ end_date, signature_id });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      end_date,
      start_date,
    });
  }

  async pick(req, res) {
    const { delivery: d, deliveryMan: dm } = req.params;

    const pickups = await Delivery.count({
      where: {
        deliveryman_id: dm,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (pickups > 5) {
      return message(res, 401, 'You can only pick 5 packages each day');
    }

    const delivery = await Delivery.findOne({
      where: { id: d, deliveryman_id: dm },
    });

    if (!delivery) {
      return message(res, 400, 'Delivery not found');
    }

    if (delivery.end_date) {
      return message(res, 401, 'You cannot update a finished delivery');
    }

    if (delivery.canceled_at) {
      return message(res, 401, 'You cannot update a canceled delivery');
    }

    if (delivery.start_date) {
      return message(res, 401, 'You cannot pick the same delivery twice');
    }

    if (!delivery.isPickable) {
      return message(
        res,
        401,
        'Deliveries can only be picked between 8 am and 6 pm'
      );
    }

    const { start_date } = req.body;

    const {
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      end_date,
    } = await delivery.update({ start_date });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      end_date,
      start_date,
    });
  }
}

export default new DeliveryManDeliveriesController();

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import { Op } from 'sequelize';

class DeliveryManDeliveriesHistoryController {
  async list(req, res, next) {
    const { id } = req.params;
    const { page = 1, filter } = req.query;

    const query =
      filter === 'canceled'
        ? {
            deliveryman_id: id,
            canceled_at: { [Op.ne]: null },
          }
        : {
            deliveryman_id: id,
            canceled_at: null,
            end_date: { [Op.ne]: null },
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
}

export default new DeliveryManDeliveriesHistoryController();

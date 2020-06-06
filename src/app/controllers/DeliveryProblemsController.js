import Delivery from '../models/Delivery';
import message from '../common/message';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemsController {
  async list(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'canceled_at'],
      limit: 10,
      offset: (page - 1) * 25,
      include: [
        {
          model: DeliveryProblem,
          as: 'deliveryProblems',
          attributes: ['id', 'description'],
          required: true,
        },
      ],
    });

    res.json(deliveries);
  }

  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      query: { delivery_id: id },
      limit: 10,
      offset: (page - 1) * 25,
      attributes: ['id', 'description'],
    });

    res.json(problems);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return message(res, 400, 'Delivery not found');
    }

    const deliveryProblems = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblems);
  }
}

export default new DeliveryProblemsController();

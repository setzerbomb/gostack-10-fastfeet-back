import DeliveryMan from '../models/DeliveryMan';

class DeliveryManRepository {
  async create(data) {
    return await DeliveryMan.create(data);
  }

  async findOne(query) {
    return await DeliveryMan.findOne(query);
  }

  async findByPk(id) {
    return await DeliveryMan.findByPk(id);
  }

  async findAll(query) {
    return await DeliveryMan.findAll(query);
  }

  async findDeliveryManByEmail(email) {
    return await DeliveryMan.findOne({
      where: {
        email,
      },
    });
  }
}

export default new DeliveryManRepository();

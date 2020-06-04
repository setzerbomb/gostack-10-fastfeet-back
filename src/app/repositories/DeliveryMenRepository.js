import DeliveryMen from '../models/DeliveryMen';

class DeliveryMenRepository {
  async create(data) {
    return await DeliveryMen.create(data);
  }

  async findOne(query) {
    return await DeliveryMen.findOne(query);
  }

  async findByPk(id) {
    return await DeliveryMen.findByPk(id);
  }

  async findAll(query) {
    return await DeliveryMen.findAll(query);
  }

  async findDeliveryMenByEmail(email) {
    return await DeliveryMen.findOne({
      where: {
        email,
      },
    });
  }
}

export default new DeliveryMenRepository();

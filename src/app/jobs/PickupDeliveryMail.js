import Mail from '../../lib/Mail';

class PickupDeliveryMail {
  get key() {
    return 'PickupDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova Entrega',
      text: 'Há uma nova entrega disponível para coleta',
      template: 'delivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        destination: delivery.recipient,
      },
    });
  }
}

export default new PickupDeliveryMail();

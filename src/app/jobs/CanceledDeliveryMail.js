import Mail from '../../lib/Mail';

class CanceledDeliveryMail {
  get key() {
    return 'CanceledDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega cancelada',
      text: 'A entrega de um dos pacotes foi cancelada',
      template: 'canceled',
      context: {
        id: delivery.id,
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        destination: delivery.recipient,
      },
    });
  }
}

export default new CanceledDeliveryMail();

import * as Yup from 'yup';

import message from '../../common/message';
import validate from '../../common/validate';

export default {
  store: async (req, res, next) => {
    const schema = Yup.object().shape(
      {
        recipient_id: Yup.number().required(),
        deliveryman_id: Yup.number().required(),
        product: Yup.string().required(),
        canceled_at: Yup.date(),
        start_date: Yup.date().when('end_date', (endDate, field) =>
          endDate ? field.required() : field
        ),
        end_date: Yup.date().when('start_date', (startDate, field) =>
          startDate ? field.min(startDate) : field
        ),
        signature_id: Yup.number().when('end_date', (endDate, field) =>
          endDate ? field.required() : field
        ),
      },
      ['end_date', 'start_date']
    );

    return await validate(req.body, schema, next, (e) => message(res, 400, e));
  },
  update: async (req, res, next) => {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      signature_id: Yup.number().when('end_date', (endDate, field) =>
        endDate ? field.required() : field
      ),
    });

    return await validate(req.params, schema, next, (e) =>
      message(res, 400, e)
    );
  },
  delete: async (req, res, next) => {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    return await validate(req.params, schema, next, (e) =>
      message(res, 400, e)
    );
  },
};

import * as Yup from 'yup';

import message from '../../common/message';
import validate from '../../common/validate';

export default {
  pick: async (req, res, next) => {
    const schema = Yup.object().shape({
      deliveryMan: Yup.number().required(),
      delivery: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    return await validate({ ...req.params, ...req.body }, schema, next, (e) =>
      message(res, 400, e)
    );
  },
  deliver: async (req, res, next) => {
    const schema = Yup.object().shape({
      deliveryMan: Yup.number().required(),
      delivery: Yup.number().required(),
      end_date: Yup.date().required(),
      signature_id: Yup.number().when('end_date', (endDate, field) =>
        endDate ? field.required() : field
      ),
    });

    return await validate({ ...req.params, ...req.body }, schema, next, (e) =>
      message(res, 400, e)
    );
  },
};

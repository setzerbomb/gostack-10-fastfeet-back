import * as Yup from 'yup';

import message from '../../common/message';
import validate from '../../common/validate';

export default {
  store: async (req, res, next) => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required().max(2),
      city: Yup.string().required(),
      postal_code: Yup.string().required(),
    });

    return await validate(req.body, schema, next, (e) => message(res, 400, e));
  },
  update: async (req, res, next) => {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required().max(2),
      city: Yup.string().required(),
      postal_code: Yup.string().required(),
    });

    const data = { ...req.body, id: req.params.id };

    return await validate(data, schema, next, (e) => message(res, 400, e));
  },
};

import * as Yup from 'yup';

import message from '../../common/message';
import validate from '../../common/validate';

export default {
  store: async (req, res, next) => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      avatar_id: Yup.number(),
    });

    return await validate(req.body, schema, next, (e) => message(res, 400, e));
  },
  update: async (req, res, next) => {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
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

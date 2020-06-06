import * as Yup from 'yup';

import message from '../../common/message';
import validate from '../../common/validate';

export default {
  store: async (req, res, next) => {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      description: Yup.string().required(),
    });

    const { id } = req.params;
    const { description } = req.body;

    return await validate({ id, description }, schema, next, (e) =>
      message(res, 400, e)
    );
  },
};

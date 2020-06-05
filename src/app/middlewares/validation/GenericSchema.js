import * as Yup from 'yup';

import message from '../../common/message';
import validate from '../../common/validate';

export default {
  index: async (req, res, next) => {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    return await validate(req.params, schema, next, (e) =>
      message(res, 400, e)
    );
  },
};

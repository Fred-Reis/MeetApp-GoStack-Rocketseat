import * as Yup from 'yup';
import { isBefore, parseISO, startOfDay } from 'date-fns';

import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const tabela = Yup.object().shape({
      titulo: Yup.string().required(),
      description: Yup.string().required(),
      local: Yup.string().required(),
      data: Yup.date().required(),
    });

    if (!(await tabela.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados incorretos!' });
    }
    const { titulo, description, local, data, banner_id } = req.body;

    const dataInicio = startOfDay(parseISO(data));

    if (isBefore(dataInicio, new Date())) {
      return res.status(401).json({ error: 'Data invalida!' });
    }

    const meetup = await Meetup.create({
      org_id: req.userId,
      titulo,
      description,
      local,
      data,
      banner_id,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();

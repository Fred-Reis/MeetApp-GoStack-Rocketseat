import * as Yup from 'yup';
import { isBefore, parseISO, startOfDay } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async store(req, res) {
    const tabela = Yup.object().shape({
      titulo: Yup.string().required(),
      description: Yup.string().required(),
      local: Yup.string().required(),
      data: Yup.date().required(),
      banner_id: Yup.number().required(),
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

  async update(req, res) {
    const tabela = Yup.object().shape({
      id: Yup.number().required(),
      titulo: Yup.string(),
      description: Yup.string(),
      local: Yup.string(),
      data: Yup.date(),
      banner_id: Yup.number(),
    });

    if (!(await tabela.isValid(req.body))) {
      return res.status(401).json({ error: 'Dados Incorretos!' });
    }

    const { id } = await req.body;

    const meetup = await Meetup.findOne({ where: { id } });

    try {
      if (meetup.org_id !== req.userId) {
        return res
          .status(401)
          .json({ error: 'Ação permitida somente ao organizador' });
      }

      const meetups = await meetup.update(req.body);

      return res.json(meetups);
    } catch (err) {
      return res.status(400).json({ error: 'Meetup inexistente!' });
    }
  }

  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { org_id: req.userId },
      order: ['data'],
      attributes: ['id', 'data', 'titulo', 'local'],
      include: [
        {
          model: User,
          as: 'org',
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }

  async delete(req, res) {
    const meetups = await Meetup.findByPk(req.params.id);

    if (meetups.org_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'Ação somente permitida ao organizador!' });
    }

    if (isBefore(meetups.data, new Date())) {
      return res.status(400).json({ error: 'Esse Meetup já aconteceu!' });
    }

    await meetups.destroy();

    return res.json(meetups);
  }
}

export default new MeetupController();

import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;
    const parseDate = parseISO(date);
    const { page = 1 } = req.query;
    const schedule = await Meetup.findAll({
      where: {
        data: { [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)] },
      },
      order: ['data'],
      attributes: ['titulo', 'data', 'local'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'org',
          attributes: ['name'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['path', 'url'],
        },
      ],
    });
    return res.json(schedule);
  }
}

export default new ScheduleController();

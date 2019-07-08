// import Queue from '../../lib/Queue';
// import SubscriptionMail from '../jobs/SubscriptionMail';

import { Op } from 'sequelize';
import { isBefore, startOfDay, startOfHour, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Mail from '../../lib/Mail';

class SubscriptionController {
  async store(req, res) {
    const { org_id, data, id, titulo } = await Meetup.findByPk(req.params.id);

    const { name, email } = await User.findByPk(org_id);

    const user = await User.findByPk(req.userId, {
      attributes: ['name', 'email'],
    });

    const dataInicio = startOfDay(data);

    if (org_id === req.userId) {
      return res
        .status(401)
        .json({ error: 'Você já é o organizador dessa Meetup!' });
    }

    if (isBefore(dataInicio, new Date())) {
      return res.status(401).json({ error: 'Meetup expirada!' });
    }

    const subscribes = await Subscription.findOne({
      where: { meetup_id: req.params.id, user_id: req.userId },
    });

    const hourStart = startOfHour(data);

    const available = await Subscription.findOne({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: { data: [hourStart] },
        },
      ],
    });

    if (available) {
      return res
        .status(401)
        .json({ error: 'Você já tem um Meetup agendado pra esse horário!' });
    }

    if (subscribes) {
      return res
        .status(401)
        .json({ error: 'Você já esta incrito nessa Meetup!' });
    }

    const subscription = await Subscription.create({
      meetup_id: id,
      user_id: req.userId,
      org_id,
    });

    await Mail.sendMail({
      to: `${name}, <${email}>`,
      subject: 'Nova inscrição na sua MeetUp!',
      template: 'subscriptions',
      context: {
        name,
        titulo,
        user: user.name,
        email: user.email,
        data: format(data, "'dia' dd 'de' MMMM', às' H:mm'hs'", {
          locale: pt,
        }),
      },
    });

    /* await Queue.add(SubscriptionMail.key, {
      user,
      name,
      email,
      titulo,
    }); */

    return res.json(subscription);
  }

  async index(req, res) {
    const subscribe = await Subscription.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          data: {
            [Op.lt]: new Date(),
          },
        },
      ],
    });

    return res.json(subscribe);
  }
}

export default new SubscriptionController();

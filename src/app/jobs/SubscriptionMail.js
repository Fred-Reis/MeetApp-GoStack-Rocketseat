import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ date }) {
    const { user, data, name, titulo, email } = date;

    await Mail.sendMail({
      to: `${name}, <${email}>`,
      subject: 'Nova inscrição na sua MeetUp!',
      template: 'subscriptions',
      context: {
        name,
        titulo,
        user: user.name,
        email: user.email,
        data: format(parseISO(data), "'dia' dd 'de' MMMM', às' H:mm'hs'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new SubscriptionMail();

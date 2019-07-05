import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import autenticaUsuario from '../../config/autentica';
import User from '../models/User';

class ControleSessao {
  async store(req, res) {
    const tabela = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await tabela.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados incorretos!' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'O usuário não existe!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha está incorreta!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, autenticaUsuario.senha, {
        expiresIn: autenticaUsuario.expira,
      }),
    });
  }
}

export default new ControleSessao();

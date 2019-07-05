import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import autConfig from '../../config/autentica';

export default async (req, res, next) => {
  const okToken = req.headers.authorization;

  if (!okToken) {
    return res.status(401).json({ error: 'Token incorreto!' });
  }

  const [, token] = okToken.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, autConfig.senha);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalido!' });
  }
};

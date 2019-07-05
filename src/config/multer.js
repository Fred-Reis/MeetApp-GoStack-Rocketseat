import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      // converte o nome do arquivo em um numero de 16 bytes padronizado
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb;

        // retorna em hexadecimal com a extensão do arquivo original
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

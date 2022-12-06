import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './secrets';
import { IToken } from '../types';

export const generateHashedPassword = async (password: string) => {
  return hash(password, 10);
};

export const validateHashedPassword = async (password: string, hash: string) => {
  if (!password || !hash) {
    return Promise.resolve(false);
  }
  return compare(password, hash);
};

export const createToken = (user): string => { // TODO set type
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as IToken);
    }
    );
  });
};

export const convertToHTML = (text: string, imagePaths: Record<string, string>) => {
  // convert image placeholders with image paths
  text = text.replace(/%(.*?)%/g, function(imagePlaseHolder: string) {
    return imagePaths[imagePlaseHolder] || imagePlaseHolder;
  });

  // Replace line breaks with <br> tags
  let html = text.replace(/\n/g, "<br>");

  // Add <p> tags around paragraphs
  html = html.replace(/<br>\s*<br>/g, "</p><p>");

  // Wrap in <html> and <body> tags
  html = "<html><body>" + html + "</body></html>";

  return html;
}
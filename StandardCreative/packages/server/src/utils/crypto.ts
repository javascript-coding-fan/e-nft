import crypto from 'crypto';

import { rsaPrivateKey, rsaPublicKey } from '../settings';

export const decryptRSA = (encryptedData) => {
  try {
    const decryptedData = crypto.privateDecrypt(rsaPrivateKey, Buffer.from(encryptedData, 'base64'));

    return decryptedData.toString('utf8');
  } catch (err) {
    throw new Error('Invalid encrypted hash');
  }
};

export const encryptRSA = (data) => {
  const encryptedData = crypto.publicEncrypt(rsaPublicKey, Buffer.from(data, 'utf8'));

  return encryptedData.toString('base64');
};

import ejs from 'ejs';
import path from 'path';

/**
 * Generate email templates
 */
export const generateEmailTemplate = (template, data) => {
  const ejsFilePath = path.join(__dirname, `../../src/ejs/email/${template}`);

  return new Promise((resolve, reject) => {
    ejs.renderFile(
      ejsFilePath,
      {
        data,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ status: true, message: result });
        }
      }
    );
  });
};

import AWS from 'aws-sdk';
import fs from 'fs';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import Handlebars from 'handlebars';
import xlsxPopulate from 'xlsx-populate';

export const uploadfile = async (file, dirname) => {
  let path = `${dirname}${process.env.IMAGE_PATH}`;
  let pathName = 'images';
  const fileName = `${Math.random()}_${file.name}`;

  const fileBuffer = await fs.readFileSync(file.path);

  await fs.writeFileSync(`${path}${fileName}`, fileBuffer, 'binary');
  return `${process.env.API_DOMAIN}/static/${pathName}/${fileName}`;
};

export const uploadFileToES = async file => {
  const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET,
    AWS_PREFIX = ''
  } = process.env;

  // check credentials
  if (!(AWS_ACCESS_KEY_ID || AWS_SECRET_ACCESS_KEY || AWS_BUCKET)) {
    throw new Error('Security credentials are not configured');
  }

  // initialize s3
  const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  });

  // generate unique name
  const fileName = `${AWS_PREFIX}${Math.random()}${file.name}`;

  // read file
  const buffer = await fs.readFileSync(file.path);

  // upload to s3
  const response = await new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: AWS_BUCKET,
        Key: fileName,
        Body: buffer,
        ACL: 'public-read'
      },
      (error, response) => {
        if (error) {
          return reject(error);
        }

        return resolve(response);
      }
    );
  });

  return response.Location;
};

/**
 * Read contents of a file
 * @param {string} filename - relative file path
 * @return {Promise} returns promise resolving file contents
 */
export const readFile = filename => {
  const filePath = `${__dirname}/../private/emailTemplates/${filename}.html`;

  return fs.readFileSync(filePath, 'utf8');
};

/**
 * Apply template
 * @param {Object} data data
 * @param {String} templateName
 * @return email with template as text
 */
const applyTemplate = async (data, templateName) => {
  let template = await readFile(templateName);

  template = Handlebars.compile(template.toString());

  return template(data);
};

export const sendEmail = async (email, password) => {
  const { NODE_ENV, API_USER, API_KEY, FROM_EMAIL } = process.env;

  if (NODE_ENV === 'test') return;

  const html = await applyTemplate(
    { content: password },
    'resetPasswordAndUsername'
  );
  const transport = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_user: `${API_USER}`,
        api_key: `${API_KEY}`
      }
    })
  );

  const mailOptions = {
    from: `${FROM_EMAIL}`,
    to: email,
    subject: 'Бүртгэл баталгаажуулах',
    html
  };

  return transport.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error); //eslint-disable-line no-console

    console.log('Info: ', info.response); //eslint-disable-line no-console
  });
};

export const sendEmailForgotPassword = async (email, link) => {
  const { NODE_ENV, API_USER, API_KEY, FROM_EMAIL } = process.env;

  if (NODE_ENV === 'test') return;

  const html = await applyTemplate({ content: link }, 'forgot_password');
  const transport = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_user: `${API_USER}`,
        api_key: `${API_KEY}`
      }
    })
  );

  const mailOptions = {
    from: `${FROM_EMAIL}`,
    to: email,
    subject: 'Нууц үг солих',
    html
  };

  return transport.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error); //eslint-disable-line no-console

    console.log('Info: ', info.response); //eslint-disable-line no-console
  });
};

export const sendEmailMessage = async (email, message) => {
  const { NODE_ENV, API_USER, API_KEY, FROM_EMAIL } = process.env;

  if (NODE_ENV === 'test') return;

  const html = await applyTemplate({ content: message }, 'email_to_user');
  const transport = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_user: `${API_USER}`,
        api_key: `${API_KEY}`
      }
    })
  );

  const mailOptions = {
    from: `${FROM_EMAIL}`,
    to: email,
    subject: 'mamba.edu.mn',
    html
  };

  return transport.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error); //eslint-disable-line no-console

    console.log('Info: ', info.response); //eslint-disable-line no-console
  });
};

/**
 * Creates blank workbook
 */
export const createXlsFile = async () => {
  // Generating blank workbook
  const workbook = await xlsxPopulate.fromBlankAsync();

  return { workbook, sheet: workbook.sheet(0) };
};

/**
 * Generates downloadable xls file on the url
 */
export const generateXlsx = async (workbook, name) => {
  // Url to download xls file
  const url = `${name}.xlsx`;
  const { DOMAIN, NODE_ENV } = process.env;

  const fs = require('fs');
  const path = require('path');

  const directory = `${__dirname}/../static/attachments/`;

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
  // Saving xls workbook to the directory
  await workbook.toFileAsync(`${__dirname}/../static/attachments/${url}`);

  if (NODE_ENV !== 'production') return `${DOMAIN}/static/attachments/${url}`;

  return `${DOMAIN}/static/attachments/${url}`;
};

export const generateXlsxEmail = async (workbook, name) => {
  // Url to download xls file
  const url = `${name}.xlsx`;

  const fs = require('fs');
  const path = require('path');

  const directory = `${__dirname}/../static/attachments/`;

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
  // Saving xls workbook to the directory
  await workbook.toFileAsync(`${__dirname}/../static/attachments/${url}`);

  return `../static/attachments/${url}`;
};

import nodemailer from "nodemailer";
import { google } from "googleapis";

export default async (req, res) => {
  sendMail(req.body)
    .then((result) => {
      console.log("email envoyé");
      res.end();
    })
    .catch((error) => {
      console.log("error: ", console.error());
      res.end();
    });
};

const CLIENT_ID =
  "932077446213-c6biu64ogg1ftfht79rrtr84qis4g77q.apps.googleusercontent.com";
const CLIENT_SECRETE = "BnphYcL_IPjkLhYDewKZ2bW5";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04cZXM9apQkegCgYIARAAGAQSNwF-L9IrBJF7TSJ81GO8bGI8CYHhGhZZvTg-qmWblBNkt_kVLQ_OAuy_rshJicNXVIDbK4DMuDk";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRETE,
  REDIRECT_URL
);
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

async function sendMail(body) {
  const data = JSON.parse(body);
  try {
    const accessToken = oauth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "cookformewebsite@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRETE,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    {
      /**data.email */
    }
    const clientMailOptions = {
      from: "cookformewebsite@gmail.com",
      to: "kabwiziserge@gmail.com",
      subject: "Your order has been received",
      generateTextFromHTML: true,
      html: `<h1>Order derscription</h1></br>
      <p>${data.orderDerscription}</p>`,
    };
    const adminMailOptions = {
      from: "cookformewebsite@gmail.com",
      to: "cookformewebsite@gmail.com",
      subject: `${data.firstName} order`,
      generateTextFromHTML: true,
      html: `<h1>New Client Order</h1></br>
      <p>Name: ${data.firstName + " " + data.name}</p></br>
      <p>E-mail: ${data.email}</p></br>
      <h2>Address</h2></br>
      <p>address line 1: ${data.address_line_1}</p></br>
      <p>address line 2: ${data.address_line_2}</p></br>
      <p>admin area 2: ${data.admin_area_2}</p></br>
      <p>admin area 1: ${data.admin_area_1}</p></br>
      <p>postal code: ${data.postal_code}</p></br>
      <p>country code: ${data.country_code}</p></br>
      <h1>Order derscription</h1></br>
      <p>${data.orderDerscription}</p>
      <h1>Deliver time (YYYY-MM-DD TIME)</h1></br>
      <p>${data.time}</p>
      `,
    };
    {
      /** attachments: [{ filename: "img.png", path: "./path/img.png" }], */
    }
    await smtpTransport.sendMail(clientMailOptions);
    await smtpTransport.sendMail(adminMailOptions);

    return true;
  } catch (error) {
    return false;
  }
}

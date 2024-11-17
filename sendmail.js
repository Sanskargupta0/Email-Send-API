const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const ClientId = process.env.CLIENT_ID;
const ClientSecret = process.env.CLIENT_SECRET;
const RedirectUrl = process.env.REDIRECT_URL;
const RefreshToken = process.env.REFRESH_TOKEN;
const cc = process.env.CarbonCopy;

const oAuth2Client = new google.auth.OAuth2(
  ClientId,
  ClientSecret,
  RedirectUrl
);

oAuth2Client.setCredentials({ refresh_token: RefreshToken });

async function sendMail(template, data) {
  try {
    let subject, text, html, userSubject, userText, userHtml;
    const date = new Date().toLocaleDateString();
    const accessToken = await oAuth2Client.getAccessToken();
    if (template == "subscribe") {
      subject = "Thank You for Subscribing to Print360!";
      text = `
Thank You for Subscribing!

Hey
${date}

We are thrilled to welcome you to Print360! Get ready for updates, exclusive offers, industry news, and valuable tips to enhance your printing experience. We’re excited to have you on this journey!

Stay tuned and let's create something amazing together!

Need assistance? Reach out at Print360Official.help@gmail.com

Print360
Noida, Uttar Pradesh 226013.
Copyright © 2024. All rights reserved.
      `;
      html = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Print360</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://img.freepik.com/premium-photo/thank-you-subscription-background_1118862-15398.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td
                style="
                  align-items: center;
                  display: flex;
                  font-size: 50px;
                  font-weight: bold;
                "
              >
                <img
                  alt=""
                  src="https://i.postimg.cc/MTpYx13B/logo.png"
                  height="100px"
                />
                <span style="padding-top: 10px;">Print360</span>
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; font-weight: bolder;"
                  >${date}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 60px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Thank You for Subscribing!
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              We are thrilled to have you with us at Print360! Expect updates, exclusive offers, industry news, and valuable tips to elevate your printing needs.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 500;
                letter-spacing: 0.56px;
                color: #434343;
              "
            >
              Stay tuned and let's create something amazing together!
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 16px;
                font-weight: 500;
                color: #1db398;
              "
            >
              - The Print360 Team
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Have questions? Reach out to us at
          <a
            href="mailto:Print360Official.help@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >Print360Official.help@gmail.com</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          Print360
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
            Noida,  Uttar Pradesh 226013.
        </p>

        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2024. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>
  
      `;
      userSubject = "Subscription Confirmation - Form Submission Received";
      userText = `
      Subject: Subscription Confirmation - Form Submission Received
      Hello,${date}
      You have received a new message through the subscription form.
      E-mail: ${data.email}
      Need to follow up? Contact us at Print360Official.help@gmail.com.
      Thank you,
      The Print360 Team
      Print360
      Sitapur, Hardoi Bypass Rd, Lucknow, Uttar Pradesh 226013.
      Copyright © 2024. All rights reserved.
      `;
      userHtml = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Subscription Confirmation - Print360</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
      color: #434343;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        border-radius: 8px;
        background-image: url(https://img.freepik.com/free-photo/thank-you-background-with-flowers_23-2148197914.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr>
              <td
                style="
                  display: flex;
                  align-items: center;
                  font-size: 50px;
                  font-weight: bold;
                "
              >
                <img
                  alt=""
                  src="https://i.postimg.cc/MTpYx13B/logo.png"
                  height="100px"
                />
                <span style="padding-top: 10px;">Print360</span>
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; font-weight: bolder;"
                  >${date}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin-top: 60px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Subscription Confirmation
            </h1>
            <p style="margin: 0; margin-top: 17px; font-size: 16px;">
              Hello,
            </p>
            <p style="margin: 16px 0 0 0;">
              You have received a new message through the subscription form.
            </p>
            <p style="margin: 16px 0 0 0;">
              <strong>E-mail:</strong> ${data.email}
            </p>
            <p
              style="
                margin: 30px 0 0 0;
                font-weight: 500;
              "
            >
              Need to follow up? Contact us at
              <a
                href="mailto:Print360Official.help@gmail.com"
                style="color: #499fb6; text-decoration: none;"
              >
                Print360Official.help@gmail.com
              </a>.
            </p>
          </div>
        </div>

        <p
          style="
            margin-top: 40px;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
            color: #434343;
          "
        >
          Thank you, <br />
          The Print360 Team
        </p>
      </main>

      <footer
        style="
          margin-top: 50px;
          text-align: center;
          font-size: 14px;
          color: #8c8c8c;
        "
      >
        <p style="margin: 0;">
          Print360
        </p>
        <p style="margin: 4px 0;">
          Sitapur, Hardoi Bypass Rd, Lucknow, Uttar Pradesh 226013.
        </p>
        <p style="margin: 4px 0;">
          Copyright © 2024. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>
      `;
    } else if (template == "contact") {
      subject = "Thank You for Contacting Print360!";
      text = `
      Thank You for Contacting!
      ${date}
      ${data.name}
      We have received your message and will get back to you shortly.
      Need to follow up? Contact us at
      <a href="mailto:Print360Official.help@gmail.com">
      Print360Official.help@gmail.com
      </a>
      `;
      html = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Print360</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://img.freepik.com/free-photo/thank-you-background-with-flowers_23-2148197914.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody> 
            <tr style="height: 0;">
              <td
                style="
                  align-items: center;
                  display: flex;
                  font-size: 50px;
                  font-weight: bold;
                "
              >
                <img
                  alt=""
                  src="https://i.postimg.cc/MTpYx13B/logo.png"
                  height="100px"
                />
                <span style="padding-top: 10px;">Print360</span>
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; font-weight: bolder;"
                  >${date}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>
      <main>
        <div
          style="
            margin: 0;
            margin-top: 60px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              Thank You for Contacting Print360!
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey, ${data.name}
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              We have received your message and will get back to you shortly.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 500;
                letter-spacing: 0.56px;
                color: #434343;
              "
            >
              Need to follow up? Contact us at
              <a
                href="mailto:
                Print360Official.help@gmail.com"
                style="color: #499fb6; text-decoration: none;"
                >
                Print360Official.help@gmail.com
              </a>
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 16px;
                font-weight: 500;
                color: #1db398;
              "
            >
              - The Print360 Team
            </p>
          </div>
        </div>
        <p
          style="
            max-width: 400px; 
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Have questions? Reach out to us at
          <a
            href="mailto:
            Print360Official.help@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >
            Print360Official.help@gmail.com
          </a>
        </p>
      </main>
      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          Print360
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Noida, Uttar Pradesh 226013.
        </p>
        <p style="margin: 0; margin-top: 16px; color: #434343;">
        Copyright © 2024. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>
      `;
      userSubject = "Contact Us - Form Submission Received";
      userText = `
      Subject: New Contact Form Submission Received

Hello,${date}

You have received a new message through the contact form.

Name: ${data.name}
Email: ${data.email}
Mobile Number: ${data.mobile}
Subject: ${data.subject}
Message: 
${data.message}

Need to follow up? Contact us at Print360Official.help@gmail.com.

Thank you,
The Print360 Team

Print360
Sitapur, Hardoi Bypass Rd, Lucknow, Uttar Pradesh 226013.

Copyright © 2024. All rights reserved.

      `;
      userHtml = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Contact Form Submission</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://img.freepik.com/free-photo/paper-texture-background_53876-64550.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
           <tr style="height: 0;">
              <td
                style="
                  align-items: center;
                  display: flex;
                  font-size: 50px;
                  font-weight: bold;
                "
              >
                <img
                  alt=""
                  src="https://i.postimg.cc/MTpYx13B/logo.png"
                  height="100px"
                />
                <span style="padding-top: 10px;">Print360</span>
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; font-weight: bolder;"
                  >${date}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 60px;
            padding: 92px 30px 115px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              New Contact Form Submission
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              You have received a new message through the contact form.
            </p>
            <div
              style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 500;
                text-align: left;
              "
            >
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Mobile Number:</strong> ${data.mobile}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Message:</strong></p>
              <p
                style="
                  margin: 0;
                  padding: 15px;
                  background: #f4f7ff;
                  border-radius: 8px;
                  font-weight: 400;
                  line-height: 1.6;
                  color: #333;
                "
              >
                ${data.message}
              </p>
            </div>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need to follow up? Contact us at
          <a
            href="mailto:Print360Official.help@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >Print360Official.help@gmail.com</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          Print360
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Sitapur, Hardoi Bypass Rd, Lucknow, Uttar Pradesh 226013.
        </p>

        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2024. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>

      `;
    } else {
      console.log("Invalid template");
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "Print360Official.help@gmail.com",
        clientId: ClientId,
        clientSecret: ClientSecret,
        refreshToken: RefreshToken,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "Print360🖨️<Print360Official.help@gmail.com>",
      to: data.email,
      subject: subject,
      text: text,
      html: html,
    };

    const userMailOptions = {
      from: "Print360🖨️<Print360Official.help@gmail.com>",
      to: cc,
      subject: userSubject,
      text: userText,
      html: userHtml,
    };

    const result = await transport.sendMail(mailOptions);
    const userResult = await transport.sendMail(userMailOptions);

    // Check if both emails were accepted for delivery
    if (result.accepted.length > 0 && userResult.accepted.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error in sendMail function:', error);
    return false;
  }
}

module.exports = sendMail;

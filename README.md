# [SendMail API](https://github.com/Sanskargupta0/Email-Send-API.git) &middot; [![Author Sanskar Gupta](https://img.shields.io/badge/Author-Sanskar-%3C%3E)](https://www.linkedin.com/in/sanskar-gupta-12476423b/)

This API enables sending dynamic emails using customizable templates, including support for file attachments. It can be used for various use cases such as sending quotations, contact form submissions, and more.

## Features

- Send dynamic emails with attachments.
- Configurable email templates (quotations, contact forms, etc.).
- Secure handling of environment variables for Gmail OAuth2 authentication.
- Built with Node.js and Express.

## Tech/framework used

- Node.js
- Express
- Nodemailer
- OAuth2 for Gmail Integration
- dotenv for environment configuration

## Endpoints

### `GET /`
Returns a health check message for the API.

#### Response: (Success)
```json
{
  "message": "Email Service Health Check"
}
```

![Health Check Image](/screenshots/health-check.png)

### `POST /subscribe-email`
Sends a subscription email to the provided email address.

#### Request:
```json
{
  "email": "user@example.com"
}
```

#### Response: (Success)
```json
{
    "message": "Email sent successfully"
}
```

![Subscription Email Image](/screenshots/subscription-email-API.png)

### `POST /contact-email`
Sends a contact form email with the provided details.

#### Request:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "message": "Hello, I need some help.",
  "subject": "Help Request",
  "mobile": "123-456-7890"
}
```

#### Response: (Success)
```json
{
    "message": "Email sent successfully"
}
```

![Contact Form Email Image](/screenshots/contact-form-email-API.png)

### `POST /quotation-email`
Sends a quotation email with the provided product details.

#### Request:
```json
{
  "id": "12345",
  "productName": "Custom Printed Box",
  "lengthh": "10",
  "width": "8",
  "quantity": "100",
  "material": "Cardboard",
  "finishes": ["Glossy", "Matte"],
  "extra": ["Die-cut", "Embossing"],
  "note": "Please ensure high durability for the packaging.",
  "artwork": "sample-artwork-file.jpg",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "123-456-7890",
  "artwork": "sample-artwork-file.jpg" // File of the artwork
}

```

#### Response: (Success)
```json
{
    "message": "Email sent successfully"
}
```

![Quotation Email Image](/screenshots/quotation-email-API.png)

## Starting the project

Open the [.env.example](/.env.example) and fill in your key then save it as .env 

```plaintext
CLIENT_ID="Your Client Id"
CLIENT_SECRET="Your Client Secret"
REDIRECT_URL="https://developers.google.com/oauthplayground"
REFRESH_TOKEN="Your Refresh Token"
CarbonCopy="Your Admin Email ID"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

then run the following command:

```bash
# clone the repo
git clone https://github.com/Sanskargupta0/Email-Send-API.git
cd Email-Send-API
npm install
# then to run the server
node index.js
```

## Demo

Check out the live API Endpoint of [SendMail API](https://email-send-api-67qp.onrender.com/) for a demo. You can use the provided endpoints to send emails with attachments and customize the email templates. The API is designed to be secure and reliable, with support for OAuth2 for Gmail integration and environment variables for configuration. The project is built with Node.js and Express, and is designed to be scalable and maintainable. The API is also designed to be easy to use and integrate with other applications, making it a popular choice for businesses and organizations looking to send dynamic emails. The project is also designed to be easy to maintain and update

## Screenshots

### Subscription Email
#### User side Email
![Subscription User side Email](/screenshots/subscription-email.png)
#### Admin side Email
![Subscribed Admin side Email](/screenshots/subscribed-email.png)
### Contact Form Email
#### User side Email
![Contact Form User Email](/screenshots/contact-form-email.png)
#### Admin side Email
![Contact Form Admin side Email](/screenshots/contact-form-admin-email.png)
### Quotation Email
#### User side Email
![Quotation User side Email](/screenshots/quotation-email.png)
#### Admin side Email
![Quotation Admin side Email](/screenshots/quotation-admin-email.png)




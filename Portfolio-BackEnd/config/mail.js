const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const transporter = {
  async sendMail({ from, to, replyTo, subject, text }) {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",

      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },

      body: JSON.stringify({
        sender: {
          name: "Software Developer",
          email: from,
        },

        to: [
          {
            email: to,
          },
        ],

        replyTo: {
          email: replyTo,
        },

        subject: subject,
        textContent: text,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || `Brevo API Error: ${response.status}`
      );
    }

    return result;
  },
};

export default transporter;
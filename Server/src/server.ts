import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import express from "express";

const app = express();

// app.get("/users", (req, res) => {
//   return res.send("Hi!");
// });

// app.post("/feedbacks", (req, res) => {
//   return res.send("Feedback!");
// });
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: { user: "976e84d1d85eeb", pass: "057b8d5f25eb3e" },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  // console.log(req.body);
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "cjdiniz@gmail.com",
    to: "diniz.cgi@gmail.com",
    subject: "Test",
    html: [
      `<div>`,
      `<p>Tipo : ${type}</p>`,
      `<p>Comm : ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log("HTTP server running");
});

// SQLite
// Prisma

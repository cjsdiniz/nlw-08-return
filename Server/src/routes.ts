import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

export const routes = express.Router();
routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: { user: "976e84d1d85eeb", pass: "057b8d5f25eb3e" },
  });
  // console.log(req.body);
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "cjsdiniz@outlook.com",
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

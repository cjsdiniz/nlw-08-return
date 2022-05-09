import express from "express";
import nodemailer from "nodemailer";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();
routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: { user: "976e84d1d85eeb", pass: "057b8d5f25eb3e" },
  });

  // console.log(req.body);

  // await transport.sendMail({
  //   from: "cjsdiniz@outlook.com",
  //   to: "diniz.cgi@gmail.com",
  //   subject: "Test",
  //   html: [
  //     `<div>`,
  //     `<p>Tipo : ${type}</p>`,
  //     `<p>Comm : ${comment}</p>`,
  //     `</div>`,
  //   ].join("\n"),
  // });

  return res.status(201).send();
});

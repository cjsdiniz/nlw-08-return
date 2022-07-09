// test("sum 2 + 2", () => {
//   expect(2 + 2).toBe(4);
// });

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// Spies

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  // { create: async () => {} },
  // { sendMail: async () => {} }
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should to be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        // screenshot: "test.jpg",
        screenshot: "data:image/png;base64;akjhlkhkshk",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });
  it("should not to be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        // screenshot: "test.jpg",
        screenshot: "data:image/png;base64;akjhlkhkshk",
      })
    ).rejects.toThrow();
  });
  it("should not to be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        // screenshot: "test.jpg",
        screenshot: "data:image/png;base64;akjhlkhkshk",
      })
    ).rejects.toThrow();
  });
  it("should not to be able to submit a feedback with invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        // screenshot: "test.jpg",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});

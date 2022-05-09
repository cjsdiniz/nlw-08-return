// test("sum 2 + 2", () => {
//   expect(2 + 2).toBe(4);
// });

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );

    expect(
      await submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        // screenshot: "test.jpg",
        screenshot: "data:image/png;base64;akjhlkhkshk",
      })
    ).resolves.not.toThrow();
  });
});

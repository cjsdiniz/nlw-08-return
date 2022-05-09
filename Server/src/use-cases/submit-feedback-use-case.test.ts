// test("sum 2 + 2", () => {
//   expect(2 + 2).toBe(4);
// });

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("Submit feedback", () => {
  it("should be able to submit a feedback", () => {
    const submitFeedback = new SubmitFeedbackUseCase(
      { create: async () => {} },
      { sendMail: async () => {} }
    );
  });
});

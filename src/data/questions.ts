export const questions: string[] = [
  "Hoe goed was je in JavaScript?",
  "Hoe goed ben je nu in JavaScript?",
  "Hoe goed was je in HTML?",
  "Hoe goed ben je nu in HTML?",
  "Hoe goed was je in CSS?",
  "Hoe goed ben je nu in CSS?",
  "Hoe goed was je in React?",
  "Hoe goed ben je nu in React?",
];

export function getQuestion(index: number): string | null {
  if (index > questions.length || index < 0) {
    return null;
  }

  return questions[index - 1];
}

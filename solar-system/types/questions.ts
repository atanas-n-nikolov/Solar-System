export type Questions = {
  id: string;
  question_text_bg: string;
  question_text_en: string;
  answers: Answer[];
};

type Answer = {
  id: string;
  is_correct: boolean;
  answer_text_bg: string;
  answer_text_en: string;
};

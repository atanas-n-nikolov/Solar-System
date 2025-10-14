import { createClient } from '@/lib/supabase/client';

export async function getQuestions(
  userId: string,
  levelId: string,
  questionQty: number
) {
  const supabase = createClient();

  const { data: answeredData, error: answeredError } = await supabase
    .from('user_answers')
    .select('question_id')
    .eq('user_id', userId)
    .eq('is_correct', true);

  if (answeredError) {
    console.error('❌ Грешка при взимане на решени въпроси:', answeredError);
    return [];
  }

  const answeredIds = (answeredData ?? []).map((q) => q.question_id);
  const filterValue = `(${answeredIds.join(',')})`;

  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select(
      `
    id,
    question_text_en,
    question_text_bg,
    answers (
      id,
      answer_text_en,
      answer_text_bg,
      is_correct
    )
  `
    )
    .eq('level_id', levelId)
    .not('id', 'in', filterValue)
    .limit(questionQty);

  if (questionsError) {
    console.error('❌ Грешка при взимане на въпроси:', questionsError);
    return [];
  }

  if (!questions || questions.length === 0) {
    const { data: fallbackQuestions, error: fallbackError } = await supabase
      .from('questions')
      .select(
        `
        id,
        question_text_en,
        question_text_bg,
        answers (
          id,
          answer_text_en,
          answer_text_bg,
          is_correct
        )
      `
      )
      .eq('level_id', levelId)
      .limit(questionQty);

    if (fallbackError) {
      console.error(
        '❌ Грешка при взимане на fallback въпроси:',
        fallbackError
      );
      return [];
    }

    return fallbackQuestions ?? [];
  }

  return questions ?? [];
}

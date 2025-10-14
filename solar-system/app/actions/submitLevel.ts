'use server';

import { updateData } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function submitLevel({
  answers,
  wrongCount,
  correctCount,
  levelScore,
  wrongAnswers,
}: {
  answers: Record<string, string>;
  wrongCount: number;
  correctCount: number;
  levelScore: number;
  wrongAnswers: number;
}) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) throw new Error('User not authenticated');
    const userId = userData.user.id;

    const questionIds = Object.keys(answers);

    const { data: dbQuestions, error } = await supabase
      .from('questions')
      .select('id, answers(answer_text_en, answer_text_bg, is_correct)')
      .in('id', questionIds);

    if (error) throw new Error(error.message);

    const results = dbQuestions.map((q) => {
      const userAnswer = answers[q.id];

      const correct =
        q.answers.find(
          (a) =>
            a.answer_text_en === userAnswer || a.answer_text_bg === userAnswer
        )?.is_correct ?? false;

      return {
        question_id: q.id,
        answer_text: userAnswer,
        is_correct: correct,
      };
    });

    const hasFailed = wrongCount > wrongAnswers;
    const baseScore = correctCount * levelScore;
    const bonus = !hasFailed ? Math.round(baseScore * 0.25) : 0;
    const finalScore = baseScore + bonus;

    const playerScore = {
      correctCount,
      wrongCount,
      baseScore,
      bonus,
      finalScore,
      passed: !hasFailed,
    };

    await updateData(results, playerScore, supabase, userId);

    if (!hasFailed) {
      console.log('✅ Level passed!');
      console.log(`🏆 Score: ${finalScore} (+${bonus} bonus)`);
    } else {
      console.log('❌ Level failed. Try again!');
      console.log(`💔 You still earned ${baseScore} points`);
    }

    return {
      success: true,
      hasFailed,
      finalScore,
      bonus,
      baseScore,
      playerScore,
    };
  } catch (err) {
    console.error('❌ Error submitting answers:', err);
    return { success: false, error: err };
  }
}

import { AuthProps } from '@/types/auth';
import { createClient } from './supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

const supabase = createClient();

export async function signUpUser({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login failed');
  }

  return true;
}

export async function signOutUser() {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to logout');
  return true;
}

export async function authSection(
  pageType: 'signup' | 'signin'
): Promise<AuthProps[]> {
  try {
    const { data, error } = await supabase
      .from('auth_section')
      .select('*')
      .eq('type', pageType);

    if (error) throw error;

    return data ?? [];
  } catch (error) {
    console.error('Unexpected error in auth section:', error);
    return [];
  }
}

export async function getProfile(id: string) {
  const isUser = await getUser();
  if (isUser && isUser.id === id) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Грешка при извличане на профила:', error);
      return null;
    }
  } else {
    console.warn('Невалиден достъп: потребителят не съвпада с id');
    return null;
  }
}

const getUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
};

export async function UpdateLang(userId: string, lang: 'en' | 'bg') {
  const { data, error } = await supabase
    .from('users')
    .update({ preferred_lang: lang })
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error updating language:', error.message);
    return null;
  }

  return data;
}

export async function UpdateTheme(userId: string, theme: 'dark' | 'light') {
  const { data, error } = await supabase
    .from('users')
    .update({ preferred_theme: theme })
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error updating theme:', error.message);
    return null;
  }

  return data;
}

export async function updateData(
  results: { question_id: string; answer_text: string; is_correct: boolean }[],
  playerScore: {
    correctCount: number;
    wrongCount: number;
    finalScore: number;
    passed: boolean;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any, 'public', 'public'>,
  userId: string
) {
  const questionIds = results.map((r) => r.question_id);

  const { error: deleteError } = await supabase
    .from('user_answers')
    .delete()
    .in('question_id', questionIds)
    .eq('user_id', userId);
  if (deleteError) throw deleteError;

  const answersPayload = results.map((r) => ({
    user_id: userId,
    question_id: r.question_id,
    answer_text: r.answer_text,
    is_correct: r.is_correct,
  }));

  const { error: insertError } = await supabase
    .from('user_answers')
    .insert(answersPayload);
  if (insertError) throw insertError;

  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select(
      'id, level, total_points, correct_answers, answered_questions, wrong_answers'
    )
    .eq('id', userId)
    .single();
  if (profileError) throw profileError;

  const currentLevel = userProfile.level ?? 1;
  const currentScore = userProfile.total_points ?? 0;
  const nextLevel = playerScore.passed ? currentLevel + 1 : currentLevel;
  const newScore = currentScore + playerScore.finalScore;
  const correctAnswers = userProfile.correct_answers + playerScore.correctCount;
  const wrongAnswers = userProfile.wrong_answers + playerScore.wrongCount;
  const answeredQuestions = userProfile.answered_questions + results.length;

  const { error: updateError } = await supabase
    .from('users')
    .update({
      total_points: newScore,
      level: nextLevel,
      correct_answers: correctAnswers,
      wrong_answers: wrongAnswers,
      answered_questions: answeredQuestions,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
  if (updateError) throw updateError;

  console.log(
    `✅ User ${userId} updated: +${playerScore.finalScore} points, level ${nextLevel}`
  );

  return { success: true };
}

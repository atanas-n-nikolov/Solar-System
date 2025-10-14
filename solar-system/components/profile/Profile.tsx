import { Questions } from '@/types/questions';
import { getUser } from '@/lib/supabase/server';
import { getLevels } from '@/lib/levels';
import { getQuestions } from '@/lib/getQuestions';
import UserData from '@/components/profile/UserData';
import UserLevel from '@/components/profile/UserLevel';
import UserStats from '@/components/profile/UserStats';
import Game from '@/components/profile/Game';
import { ProfileUIProvider } from '@/context/profileProvider';
import { UserProfile } from '@/types/profile';

export default async function Profile({ id }: { id: string }) {
  const profile: UserProfile = await getUser({ id });
  const levels = await getLevels();
  const currentLevel = levels.find((l) => l.level === profile.level);
  const nextLevel = levels.find((l) => l.level === profile.level + 1);
  let questions: Questions[] = [];
  let wrongAnswers = 0;
  let levelScore = 0;
  if (currentLevel) {
    wrongAnswers = currentLevel.max_wrong_answers;
    levelScore = currentLevel.question_score;
    questions = await getQuestions(
      profile.id,
      currentLevel.id,
      currentLevel.question_qty
    );
  }

  return (
    <ProfileUIProvider>
      <section
        aria-labelledby='profile-section'
        className='grid grid-cols-[379px_1fr] grid-rows-[130px_416px] gap-x-[32px] gap-y-[40px] m-auto w-full max-w-[1216px]'
      >
        <h2 id='profile-section' className='sr-only'>
          User profile and stats
        </h2>
        <UserData profile={profile} />
        <UserLevel level={profile.level} levels={levels} />
        <UserStats
          correctAnswers={profile.correct_answers}
          answeredQuestions={profile.answered_questions}
          wrongAnswers={profile.wrong_answers}
        />
        <Game
          questions={questions}
          nextLevel={nextLevel}
          wrongAnswers={wrongAnswers}
          levelScore={levelScore}
        />
      </section>
    </ProfileUIProvider>
  );
}

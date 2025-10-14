'use client';
import { useTheme } from '@/context/themeProvider';
import { Questions } from '@/types/questions';
import { useState } from 'react';
import ArrowNext from '@/components/svg/ArrowNext';
import ArrowBack from '@/components/svg/ArrowBack';
import Guideline from '@/components/profile/Guideline';
import Intro from '@/components/profile/Intro';
import { useProfileUI } from '@/context/profileProvider';
import { Levels } from '@/types/levels';
import { submitLevel } from '@/app/actions/submitLevel';
import { useLanguage } from '@/context/languageProvider';

type GameProps = {
  questions: Questions[];
  nextLevel?: Levels;
  wrongAnswers: number;
  levelScore: number;
};

export default function Game({
  questions,
  nextLevel,
  wrongAnswers,
  levelScore,
}: GameProps) {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const { isPlaying, setIsPlaying } = useProfileUI();

  const [isQuestion, setIsQuestion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [showResults, setShowResults] = useState(false);

  const handleStart = () => setIsPlaying(true);
  const handleShowQuestion = () => setIsQuestion(true);

  const question = questions[currentIndex];

  if (!question) {
    return <div>Няма налични въпроси.</div>;
  }

  const currentQuestionText =
    language === 'en' ? question.question_text_en : question.question_text_bg;

  const selectedOption = answers[question.id] || null;

  const handleSubmit = async () => {
    const res = await submitLevel({
      answers,
      wrongCount,
      correctCount,
      levelScore,
      wrongAnswers,
    });

    if (res.success) {
      setShowResults(true);
      console.log(res);
    } else {
      console.error(res.error);
    }
  };

  const handleSelect = (answerText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: answerText,
    }));
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setIsQuestion(false);
    }
  };

  const correctCount = Object.entries(answers).reduce((acc, [qId, ans]) => {
    const question = questions.find((q) => q.id === qId);
    if (!question) return acc;

    const isCorrect = question.answers.find((a) => {
      const answerText =
        language === 'en' ? a.answer_text_en : a.answer_text_bg;
      return answerText === ans;
    })?.is_correct;

    return acc + (isCorrect ? 1 : 0);
  }, 0);

  const wrongCount = Object.keys(answers).length - correctCount;

  return (
    <aside
      aria-labelledby='game-action'
      className={`relative flex flex-col justify-center items-center row-span-1 transition-opacity duration-300 gap-6 px-6 border border-[#CDD0DB] rounded-[8px] self-stretch ${
        darkMode ? 'bg-[#FFFFFF1A]' : ''
      }`}
    >
      {!isPlaying && <Intro nextLevel={nextLevel} handleChange={handleStart} />}
      {isPlaying && !isQuestion && (
        <Guideline handleQuestion={handleShowQuestion} />
      )}

      {isQuestion && !showResults && (
        <div className='w-full max-w-[300px] flex flex-col gap-4 items-center justify-center'>
          <div className='absolute right-2 top-2 py-1 px-4 rounded-full bg-gray-600 w-[76px] text-sm leading-[22px] text-center text-white'>
            {currentIndex + 1} / {questions.length}
          </div>

          <h3
            id='game-action'
            className='font-montserrat text-2xl font-black text-center'
          >
            {currentQuestionText}
          </h3>

          <div className='w-full flex flex-col items-start justify-center gap-2 p-6 rounded-[8px] border border-[#CDD0DB]'>
            <ul className='font-light w-full flex flex-col gap-2'>
              {question.answers.map((option, index) => {
                const answerText =
                  language === 'en'
                    ? option.answer_text_en
                    : option.answer_text_bg;

                return (
                  <li
                    key={index}
                    className='flex gap-2 items-center font-light'
                  >
                    <label className='flex items-center cursor-pointer'>
                      <input
                        type='radio'
                        name={`answer-${currentIndex}`}
                        value={answerText}
                        checked={selectedOption === answerText}
                        onChange={() => handleSelect(answerText)}
                        className='sr-only'
                      />

                      <span
                        className={`size-6 flex-shrink-0 rounded-[6px] border hover:border-2 flex items-center justify-center relative
                        ${
                          selectedOption === answerText
                            ? 'border-none bg-gradient-to-tr from-[#FF5F68] to-[#AE4BCE]'
                            : 'border-[#CDD0DB]'
                        }`}
                      >
                        <svg
                          className={`size-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none
                          ${
                            selectedOption === answerText
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth={3}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M5 13l4 4L19 7' />
                        </svg>
                      </span>

                      <span className='ml-2 select-none'>{answerText}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className='w-full flex items-center gap-4'>
            <button
              onClick={handleBack}
              className='flex-1 flex items-center justify-center gap-2 py-2 px-6 profile-ring border-none after:rounded-full'
            >
              <ArrowBack /> Back
            </button>

            <button
              onClick={
                currentIndex === questions.length - 1
                  ? handleSubmit
                  : handleNext
              }
              disabled={!selectedOption}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-6 rounded-full text-white transition-colors ${
                !selectedOption
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#FF5F68] to-[#AE4BCE]'
              }`}
            >
              {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
              <ArrowNext />
            </button>
          </div>
        </div>
      )}

      {showResults && (
        <>
          <h1>welldone</h1>
          <p>{wrongCount <= wrongAnswers}</p>
          <p>{nextLevel?.image_url}</p>
          <p>{correctCount}</p>
          <p>{wrongCount}</p>
        </>
        // <ResultsScreen
        //   passed={wrongCount <= wrongAnswers}
        //   nextLevel={nextLevel}
        //   correctCount={correctCount}
        //   wrongCount={wrongCount}
        // />
      )}
    </aside>
  );
}


import React, { useState, useMemo, useCallback } from 'react';
import { EXERCISES } from '../constants';
import { Exercise, ExerciseType } from '../types';

const Exercises: React.FC = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);

  const currentExercise = useMemo(() => EXERCISES[currentExerciseIndex], [currentExerciseIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase()) {
      setFeedback({ message: 'ถูกต้อง! เก่งมาก!', isCorrect: true });
    } else {
      setFeedback({ message: `ผิด! คำตอบที่ถูกต้องคือ "${currentExercise.answer}"`, isCorrect: false });
    }
  };

  const handleNextQuestion = useCallback(() => {
    setFeedback(null);
    setUserAnswer('');
    setCurrentExerciseIndex((prevIndex) => (prevIndex + 1) % EXERCISES.length);
  }, []);

  const getQuestionTitle = (type: ExerciseType) => {
    switch(type) {
      case ExerciseType.OctalToSymbolic: return "โจทย์: แปลง Octal เป็น Symbolic";
      case ExerciseType.SymbolicToOctal: return "โจทย์: แปลง Symbolic เป็น Octal";
      case ExerciseType.Scenario: return "โจทย์: สถานการณ์จริง";
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">แบบฝึกหัด</h2>
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-300">{getQuestionTitle(currentExercise.type)}</p>
          <p className="text-xl mt-2 text-white" dangerouslySetInnerHTML={{ __html: currentExercise.question }} />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white text-lg rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-3 font-mono"
            placeholder="พิมพ์คำตอบของคุณที่นี่"
            disabled={!!feedback}
          />
          {!feedback && (
            <button
              type="submit"
              className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              ตรวจคำตอบ
            </button>
          )}
        </form>

        {feedback && (
          <div className={`mt-4 p-4 rounded-lg text-center font-bold ${feedback.isCorrect ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {feedback.message}
          </div>
        )}

        {feedback && (
          <button
            onClick={handleNextQuestion}
            className="mt-4 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            ข้อต่อไป
          </button>
        )}
      </div>
        <p className="text-center mt-4 text-gray-500 text-sm">ข้อที่ {currentExerciseIndex + 1} จาก {EXERCISES.length}</p>
    </div>
  );
};

export default Exercises;

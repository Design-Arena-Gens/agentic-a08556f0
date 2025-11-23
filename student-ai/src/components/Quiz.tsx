"use client";
import { useMemo, useState } from "react";
import Section from "@/components/Section";
import { QuizQuestion, generateQuiz } from "@/lib/text";

type AnswerState = Record<number, number>; // questionIndex -> selected choice index

export default function Quiz() {
  const [input, setInput] = useState("");
  const [num, setNum] = useState(5);
  const questions: QuizQuestion[] = useMemo(() => generateQuiz(input, num), [input, num]);
  const [answers, setAnswers] = useState<AnswerState>({});

  const score = useMemo(() => {
    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i]?.correctIndex) correct++;
    }
    return { correct, total: questions.length };
  }, [answers, questions]);

  return (
    <Section
      title="Quiz Generator"
      description="Turn content into multiple-choice questions. Select answers to see your score."
      right={
        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <span>
            Score: <span className="font-semibold">{score.correct}</span> / {score.total || 0}
          </span>
          <label className="ml-2">Questions</label>
          <input
            type="number"
            min={1}
            max={10}
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
            className="w-20 rounded-md border border-zinc-300 bg-white p-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      }
    >
      <div className="grid gap-3 md:grid-cols-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type your content here..."
          className="min-h-[200px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <div className="flex flex-col gap-4">
          {questions.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">Questions will appear here.</p>
          ) : (
            questions.map((q, i) => (
              <QuestionCard
                key={i}
                index={i}
                question={q}
                selected={answers[i]}
                onSelect={(choiceIndex) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [i]: choiceIndex,
                  }))
                }
              />
            ))
          )}
        </div>
      </div>
    </Section>
  );
}

function QuestionCard({
  index,
  question,
  selected,
  onSelect,
}: {
  index: number;
  question: QuizQuestion;
  selected: number | undefined;
  onSelect: (choiceIndex: number) => void;
}) {
  const isCorrect = selected !== undefined && selected === question.correctIndex;
  const isAnswered = selected !== undefined;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">Q{index + 1}</div>
      <div className="mb-3 text-zinc-900 dark:text-zinc-100">{question.question}</div>
      <div className="grid gap-2">
        {question.choices.map((c, idx) => {
          const isSelected = selected === idx;
          const isCorrectChoice = idx === question.correctIndex;
          const color =
            isAnswered && isSelected
              ? isCorrect
                ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950"
                : "border-rose-600 bg-rose-50 dark:bg-rose-950"
              : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900";
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`rounded-md border px-3 py-2 text-left text-sm transition ${color}`}
            >
              {c}
              {isAnswered && isSelected ? (
                <span className="ml-2 text-xs font-medium">
                  {isCorrect ? "? Correct" : isCorrectChoice ? "" : "?"}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}


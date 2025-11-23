'use client';
import { useMemo, useState } from 'react';
import Section from '@/components/Section';
import { generateFlashcards } from '@/lib/text';

export default function Flashcards() {
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  const cards = useMemo(() => generateFlashcards(input, 8), [input]);
  const current = cards[index] || null;
  const [showBack, setShowBack] = useState(false);

  const canPrev = index > 0;
  const canNext = index < Math.max(0, cards.length - 1);

  function move(delta: number) {
    const next = Math.min(Math.max(0, index + delta), Math.max(0, cards.length - 1));
    setIndex(next);
    setShowBack(false);
  }

  return (
    <Section
      title="Flashcards"
      description="Auto-generate flashcards from your text. Click card to flip."
      right={
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {cards.length > 0 ? `${index + 1} / ${cards.length}` : '0 / 0'}
        </div>
      }
    >
      <div className="grid gap-3 md:grid-cols-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type your content here..."
          className="min-h-[200px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-violet-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <div className="flex flex-col gap-3">
          <button
            className="w-full rounded-lg border border-zinc-300 bg-gradient-to-b from-white to-zinc-50 p-4 text-left text-sm shadow-sm transition hover:shadow dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-950"
            onClick={() => setShowBack((s) => !s)}
            disabled={!current}
          >
            {current ? (
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {showBack ? 'Answer' : 'Prompt'}
                </div>
                <div className="text-zinc-900 dark:text-zinc-100">
                  {showBack ? current.back : current.front}
                </div>
              </div>
            ) : (
              <div className="text-zinc-500">Cards will appear here.</div>
            )}
          </button>
          <div className="flex items-center justify-between">
            <button
              onClick={() => move(-1)}
              disabled={!canPrev}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
            >
              Prev
            </button>
            <button
              onClick={() => move(1)}
              disabled={!canNext}
              className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}


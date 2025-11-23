'use client';
import { useMemo, useState } from 'react';
import Section from '@/components/Section';
import { summarizeText } from '@/lib/text';

export default function Summarizer() {
  const [input, setInput] = useState("");
  const [count, setCount] = useState(3);
  const summary = useMemo(() => summarizeText(input, count), [input, count]);

  return (
    <Section
      title="Summarizer"
      description="Paste notes or textbook text. Get a concise summary."
      right={
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-600 dark:text-zinc-400">Sentences</label>
          <input
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
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
          className="min-h-[200px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        />
        <div className="min-h-[200px] rounded-lg border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
          {summary.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">Summary will appear here.</p>
          ) : (
            <ol className="list-decimal space-y-1 pl-6">
              {summary.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </Section>
  );
}


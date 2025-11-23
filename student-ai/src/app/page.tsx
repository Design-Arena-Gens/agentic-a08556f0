import Summarizer from "@/components/Summarizer";
import Flashcards from "@/components/Flashcards";
import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white px-4 py-10 font-sans dark:from-black dark:to-zinc-950 md:px-6">
      <header className="mx-auto mb-8 max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Student AI Toolkit
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Summarize notes, generate flashcards, and build quizzes ? all on your device.
        </p>
      </header>
      <main className="mx-auto grid max-w-5xl gap-6">
        <Summarizer />
        <Flashcards />
        <Quiz />
        <footer className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
          Built with Next.js & Tailwind. No external AI services required.
        </footer>
      </main>
    </div>
  );
}

import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  description?: string;
  right?: React.ReactNode;
}>;

export default function Section({ title, description, right, children }: Props) {
  return (
    <section className="w-full rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
          ) : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}


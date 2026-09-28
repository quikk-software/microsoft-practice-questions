import type { ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Nachschlagewerk: rendert das Markdown eines Examens (config.compendium)
// mit Inhaltsverzeichnis. Überschriften bekommen stabile Anker-IDs, damit
// aus dem Inhaltsverzeichnis und von außen (z. B. Glossar) verlinkt werden kann.

export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface TocEntry {
  level: 2 | 3;
  text: string;
  id: string;
}

/** Inhaltsverzeichnis aus den ##- und ###-Überschriften des Markdowns. */
export function tableOfContents(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  for (const line of markdown.split("\n")) {
    const m = line.match(/^(##|###)\s+(.+?)\s*$/);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    entries.push({ level: m[1].length as 2 | 3, text, id: headingId(text) });
  }
  return entries;
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function Compendium({ markdown }: { markdown: string }) {
  return (
    <div className="text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-6 text-3xl font-bold tracking-tight">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2
              id={headingId(textOf(children))}
              className="mt-14 scroll-mt-24 border-b border-zinc-200 pb-2 text-2xl font-bold tracking-tight dark:border-zinc-800"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={headingId(textOf(children))}
              className="mt-10 scroll-mt-24 text-xl font-semibold"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              id={headingId(textOf(children))}
              className="mt-6 scroll-mt-24 text-base font-semibold text-brand-800 dark:text-brand-300"
            >
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="mt-3">{children}</p>,
          ul: ({ children }) => <ul className="mt-3 list-disc space-y-1 pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="mt-3 list-decimal space-y-1 pl-6">{children}</ol>,
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
              className="text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700 dark:text-brand-400"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-4 rounded-lg border-l-4 border-brand-300 bg-brand-50/60 px-4 py-2 dark:border-brand-800 dark:bg-brand-950/30">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) =>
            className ? (
              <code className="block overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-xs leading-relaxed text-zinc-100 dark:bg-zinc-950">
                {children}
              </code>
            ) : (
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[13px] dark:bg-zinc-800">
                {children}
              </code>
            ),
          pre: ({ children }) => <pre className="mt-4">{children}</pre>,
          table: ({ children }) => (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b-2 border-zinc-300 bg-zinc-50 px-3 py-2 text-left font-semibold dark:border-zinc-700 dark:bg-zinc-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-zinc-200 px-3 py-2 align-top dark:border-zinc-800">
              {children}
            </td>
          ),
          hr: () => <hr className="my-10 border-zinc-200 dark:border-zinc-800" />,
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}

export function CompendiumToc({ entries }: { entries: TocEntry[] }) {
  return (
    <nav aria-label="Inhalt" className="text-sm">
      <p className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">Inhalt</p>
      <ul className="space-y-1">
        {entries.map((e) => (
          <li key={e.id} className={e.level === 3 ? "pl-4" : "mt-2 font-medium"}>
            <a
              href={`#${e.id}`}
              className="text-zinc-600 hover:text-brand-700 dark:text-zinc-400 dark:hover:text-brand-300"
            >
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

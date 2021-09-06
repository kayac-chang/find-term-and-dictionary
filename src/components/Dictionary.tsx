import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Icon } from ".";
import clsx from "clsx";

type ButtonProps = {
  type: "next" | "prev";
  onClick?: () => void;
};
function Button({ type, onClick }: ButtonProps) {
  return (
    <button
      className={clsx("w-3 text-black", type === "prev" && "rotate-180")}
      onClick={onClick}
    >
      <Icon.Triangle />

      <span className="sr-only">
        {type === "next" && "Next"}
        {type === "prev" && "Prev"}
      </span>
    </button>
  );
}

function debounce(ms: number, func: Function) {
  let timer: number | undefined;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => func(...args), ms);
  };
}

function search(word: string): Promise<IDictionary> {
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((data) => data[0]);
}
const clamp = (min: number, max: number, num: number) =>
  Math.min(Math.max(num, min), max);

interface IDictionary {
  word: string;
  phonetics: { text: string; audio: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
    }[];
  }[];
}

type DictionaryProps = {
  keyword: string;
  className?: string;
  style?: CSSProperties;
};
export function Dictionary({ keyword, className, style }: DictionaryProps) {
  const [data, setData] = useState<IDictionary | undefined>(undefined);
  const [active, setActive] = useState(0);

  const debounced = useRef(
    debounce(1000, (keyword: string) =>
      search(keyword)
        .then(setData)
        .then(() => setActive(0))
    )
  );

  useEffect(() => debounced.current(keyword), [keyword]);

  if (!data) return <></>;

  const { word, phonetics, meanings } = data;

  return (
    <dialog
      className={clsx("p-6 absolute space-y-4 w-full max-w-lg", className)}
      style={style}
      open
    >
      <header className="space-y-2">
        <h2 className="text-xl font-bold">{word}</h2>

        <div className="text-xs space-x-4">
          {phonetics.map(({ text }) => (
            <i key={text}>{text}</i>
          ))}
        </div>
      </header>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">meanings</h3>

          <div className="flex gap-4">
            <Button
              type="prev"
              onClick={() =>
                setActive(clamp(0, meanings.length - 1, active - 1))
              }
            />

            <span>{active + 1}</span>

            <Button
              type="next"
              onClick={() =>
                setActive(clamp(0, meanings.length - 1, active + 1))
              }
            />
          </div>
        </div>

        <ul>
          {meanings.map(({ partOfSpeech, definitions }, index) => (
            <li key={partOfSpeech}>
              <div
                className={clsx(
                  "text-xs space-y-4",
                  index === active ? "block" : "hidden"
                )}
              >
                <p>{partOfSpeech}</p>

                {definitions.map(({ definition, example }) => (
                  <div key={definition}>
                    <p>{definition}</p>
                    <p>{example}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

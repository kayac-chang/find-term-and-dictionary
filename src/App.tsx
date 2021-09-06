import React, { useState, useEffect, useRef } from "react";
import { Search, Card, Dictionary } from "./components";

const initial = `
"Just that," said the fox. "To me, you are still nothing more
than a little boy who is just like a hundred thousand other
little boys. And I have no need of you. And you, on your part,
have no need of me. To you, I am nothing more than a fox like a
hundred thousand other foxes. But if you tame me, then we shall
need each other. To me, you will be unique in all the world. To
you, I shall be unique in all the world . . ."
`.trim();

interface Vec {
  x: number;
  y: number;
}

function App() {
  const [article, setArticle] = useState(initial);
  const [search, setSearch] = useState("");

  const ref = useRef<HTMLParagraphElement>(null);

  const [pos, setPos] = useState<Vec | undefined>(undefined);

  useEffect(() => {
    if (!search || !initial.includes(search)) {
      setArticle(initial);

      setPos(undefined);

      return;
    }

    setArticle(initial.replaceAll(search, `<mark>${search}</mark>`));

    requestAnimationFrame(() => {
      const mark = ref.current?.querySelector("mark");

      if (!mark) return;

      const { x, y, height } = mark.getBoundingClientRect();

      setPos({ x, y: y + height });
    });
  }, [search, setArticle]);

  return (
    <>
      <main className="h-screen grid place-content-center">
        <div className="max-w-3xl w-screen mx-auto space-y-8">
          <h1 className="font-bold text-2xl">Find Term and Dictionary</h1>

          <div className="space-y-6">
            <Card type="white">
              <Search label="Search the term in article" onChange={setSearch} />
            </Card>

            <Card type="white">
              <div className="px-8 py-9">
                <p
                  className="max-h-[50vh] overflow-auto"
                  dangerouslySetInnerHTML={{ __html: article }}
                  ref={ref}
                />
              </div>
            </Card>
          </div>
        </div>
      </main>

      {search && pos && (
        <Card type="blue">
          <Dictionary
            keyword={search}
            style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
          />
        </Card>
      )}
    </>
  );
}

export default App;

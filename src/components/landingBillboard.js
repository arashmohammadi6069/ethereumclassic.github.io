import React, { useState } from "react";
import "twin.macro";
import { useIntervalWhen } from "rooks";
import { StaticImage } from "gatsby-plugin-image";
import { shuffle } from "lodash";
import useScroll from "../utils/useScroll";

function RandomWords({ words }) {
  const shuffled = words.slice(0, 1).concat(shuffle(words.slice(1)));
  const [{ i, arr }, setState] = useState({ i: 0, arr: shuffled });
  useIntervalWhen(() => {
    setState({ arr, i: i === arr.length - 1 ? 0 : i + 1 });
  }, 800);
  return (
    <span tw="font-extrabold text-4xl md:text-5xl lg:text-6xl whitespace-nowrap tracking-tight">
      {arr[i]}{" "}
    </span>
  );
}

function Lass() {
  const { y, h, w } = useScroll();
  const ratio = h / w;
  const start = 50;
  const pos = start - Math.floor(y / (ratio * 2));
  const mt = isNaN(pos) ? start : pos;
  return (
    <div css={{ marginTop: `${mt}px` }}>
      <StaticImage
        src="../images/lass3.png"
        alt="lass"
        placeholder="tracedSVG"
        tracedSVGOptions={{ color: "#333" }}
      />
    </div>
  );
}

export default function LandingBillboard({ text, randomWords }) {
  return (
    <div tw="bg-gradient-to-r from-green-300 to-green-600 overflow-hidden dark:from-green-700 dark:to-gray-900 select-none h-[40rem] sm:h-[30rem] md:h-[40rem] lg:h-[70vh]">
      <div tw="max-w-7xl mx-auto h-full px-6 grid grid-cols-12 items-center">
        <div tw="h-full col-span-full px-8 sm:px-0 sm:col-span-7 text-green-200 sm:overflow-hidden">
          <Lass />
        </div>
        <div tw="flex flex-col text-3xl lg:text-5xl uppercase font-light text-green-50 leading-tight tracking-widest sm:-ml-6 col-span-full text-center row-start-1 pt-10 sm:text-left sm:pt-0 sm:col-span-5 sm:row-start-auto">
          {text.split("%%").map((str) =>
            str === "$$" ? (
              <RandomWords key={str} words={Object.values(randomWords)} />
            ) : (
              <span key={str} tw="opacity-70 whitespace-nowrap">
                {str.trim()}{" "}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

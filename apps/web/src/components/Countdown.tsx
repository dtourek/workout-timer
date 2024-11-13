import { useTheme } from "@/components/ThemeProvider.tsx";
import { useDimensions } from "@/hooks/useDimensions.ts";
import { displayTime } from "@/lib/time.ts";
import { colorByPhase } from "@/lib/utils.ts";
import { CounterPhase, useCounter } from "shared";

interface ICountdownProps {
  secondsTotal: number;
  secondsRemaining: number;
  phase: CounterPhase;
}

export const Countdown = ({ secondsTotal, secondsRemaining, phase }: ICountdownProps) => {
  const dimensions = useDimensions();
  const progressPercent = (secondsRemaining / secondsTotal) * 100;
  const width = Math.floor(Math.min(dimensions.width, dimensions.height) * (dimensions.isLandscape ? 0.6 : 0.8));
  const radiusCount = width / 2 - 10;
  const strokeDashArray = 2 * Math.PI * radiusCount;
  const strokeDashoffset = strokeDashArray * ((100 - progressPercent) / 100);
  const { counter } = useCounter();
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const counterColor = isLightTheme ? "#42464C" : `white`;
  const counterFontSize = dimensions.isLandscape ? "7vw" : "14vw";

  return (
    <>
      <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} style={{ transform: "rotate(-90deg)" }}>
        <circle r={radiusCount} cx={width / 2} cy={width / 2} fill={isLightTheme ? "white" : "none"} stroke={colorByPhase[phase]} strokeWidth="5px" />
        <text
          className="font-extralight dark:fill-white"
          x="50%"
          y="50%"
          fill="#42464C"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={counterFontSize}
          style={{ transform: "rotate(90deg) scale(1, 1.3)", transformOrigin: "center" }}
        >
          {displayTime(counter.counter.timeLeft)}
        </text>
        <text
          className="font-bold uppercase dark:fill-white"
          x="50%"
          y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="1rem"
          fill="#42464C"
          style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
        >
          {counter.phase}
        </text>
        <circle
          r={radiusCount}
          cx={width / 2}
          cy={width / 2}
          fill="transparent"
          stroke={counterColor}
          strokeWidth="5px"
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={strokeDashArray}
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};

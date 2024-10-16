import { useCounter } from "@/hooks/useCounter.tsx";
import { useDimensions } from "@/hooks/useDimensions.ts";
import { displayTime } from "@/lib/time.ts";
import { colorByPhase } from "@/lib/utils.ts";
import { CounterPhase } from "@/types.ts";

interface ICountdownProps {
  secondsTotal: number;
  secondsRemaining: number;
  phase: CounterPhase;
}

export const Countdown = ({ secondsTotal, secondsRemaining, phase }: ICountdownProps) => {
  const dimensions = useDimensions();
  const progressPercent = (secondsRemaining / secondsTotal) * 100;
  const width = Math.floor(Math.min(dimensions.width, dimensions.height) * 0.8);
  const radiusCount = width / 2 - 10;
  const strokeDashArray = 2 * Math.PI * radiusCount;
  const strokeDashoffset = strokeDashArray * ((100 - progressPercent) / 100);
  const { counter } = useCounter();

  return (
    <>
      <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} style={{ transform: "rotate(-90deg)" }}>
        <circle r={radiusCount} cx={width / 2} cy={width / 2} fill="none" stroke={colorByPhase[phase]} strokeWidth="5px" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="4rem"
          dy=".2em"
          style={{ transform: "rotate(90deg)", transformOrigin: "center" }}
        >
          {displayTime(counter.timeLeft)}
        </text>
        <circle
          r={radiusCount}
          cx={width / 2}
          cy={width / 2}
          fill="transparent"
          stroke="#ffffff"
          strokeWidth="5px"
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={strokeDashArray}
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};

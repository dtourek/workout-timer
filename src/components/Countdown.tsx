import { useCounter } from "@/hooks/useCounter.tsx";
import { displayTime } from "@/lib/time.ts";
import { colorByPhase } from "@/lib/utils.ts";
import { CounterPhase } from "@/types.ts";

interface ICountdownProps {
  secondsTotal: number;
  secondsRemaining: number;
  phase: CounterPhase;
}

export const Countdown = ({ secondsTotal, secondsRemaining, phase }: ICountdownProps) => {
  const progressPercent = (secondsRemaining / secondsTotal) * 100;
  const radiusCount = 240;
  const strokeDashArray = 2 * Math.PI * radiusCount;
  const strokeDashoffset = strokeDashArray * ((100 - progressPercent) / 100);
  const width = 500;
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
          fontSize="80px"
          dy=".3em"
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

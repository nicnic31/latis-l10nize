import cn from "classnames";

interface ProgressBarProps {
  width: number;
}

export default function ProgressBar({ width }: ProgressBarProps) {
  return (
    <div className="bg-[#FFF6F4] w-full h-8 relative mb-5">
      <div
        className={cn("bg-[#75C2F6] h-full")}
        style={{ width: width === 100 ? "100%" : `${width}%` }}
      />
      <div className="absolute top-2 right-[40%]">
        <p className="text-xs font-semibold tracking-wide">L10nizing... {width}%</p>
      </div>
    </div>
  );
}

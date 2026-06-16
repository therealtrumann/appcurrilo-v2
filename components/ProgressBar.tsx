interface ProgressBarProps {
  current: number;
  total: number;
  stepName: string;
}

export default function ProgressBar({ current, total, stepName }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#7A1515]">Etapa {current} de {total}</span>
        <span className="text-sm text-gray-500">{stepName}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7A1515] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

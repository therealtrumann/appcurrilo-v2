interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showBack?: boolean;
  isLastStep?: boolean;
}

export default function StepNavigation({ onBack, onNext, nextLabel = "Continuar", showBack = true, isLastStep = false }: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ← Voltar
        </button>
      ) : <div />}
      <button
        type="button"
        onClick={onNext}
        className={`flex items-center gap-2 font-bold px-8 py-3 rounded-full shadow transition-all duration-200 hover:shadow-md hover:scale-105 ${
          isLastStep
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-[#7A1515] hover:bg-[#6B1010] text-white"
        }`}
      >
        {nextLabel} →
      </button>
    </div>
  );
}

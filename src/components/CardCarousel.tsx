import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardCarouselProps {
  children: React.ReactNode[];
}

const CardCarousel = ({ children }: CardCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const total = children.length;

  const goNext = () => setCurrent((c) => Math.min(c + 1, total - 1));
  const goPrev = () => setCurrent((c) => Math.max(c - 1, 0));

  const canNext = current < total - 1;
  const canPrev = current > 0;

  return (
    <div className="w-full space-y-4">
      <div className="relative flex items-center gap-2">
        <button
          onClick={goPrev}
          disabled={!canPrev}
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-card border border-border disabled:opacity-20 transition-opacity"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {children.map((child, i) => (
              <div key={i} className="w-full shrink-0 px-1">
                {child}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goNext}
          disabled={!canNext}
          className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-card border border-border disabled:opacity-20 transition-opacity"
          aria-label="Next card"
        >
          <ChevronRight className={`w-5 h-5 text-foreground ${canNext ? "animate-breathe" : ""}`} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-4" : "bg-border"
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;

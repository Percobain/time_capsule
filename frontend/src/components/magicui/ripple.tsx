import React, { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 230, // Slightly reduced from 250
  mainCircleOpacity = 0.28, // Reduced from 0.4 (30% reduction)
  numCircles = 8,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className,
      )}
      {...props}
    >
      <style jsx>{`
        @keyframes ripple {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: var(--max-opacity);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.9); // Less dramatic scale (0.85 -> 0.9)
            opacity: calc(var(--max-opacity) * 0.85); // Less opacity change
          }
        }
      `}</style>

      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 75; // Slightly reduced spacing
        const opacity = mainCircleOpacity - i * 0.015; // Reduced opacity drop-off
        
        // 30% less vibrant colors
        const bgColor = i % 2 === 0 
          ? "rgba(139, 92, 246, 0.17)" // Reduced from 0.25
          : "rgba(91, 33, 182, 0.2)";  // Reduced from 0.3
        
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        
        // 30% less prominent borders
        const borderColor = i % 2 === 0 
          ? "rgba(167, 139, 250, 0.25)" // Reduced from 0.35
          : "rgba(124, 58, 237, 0.28)"; // Reduced from 0.4

        return (
          <div
            key={i}
            className="absolute rounded-full border"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                borderStyle,
                borderWidth: i % 3 === 0 ? "1.5px" : "1px", // Reduced border thickness
                borderColor,
                backgroundColor: bgColor,
                boxShadow: i % 2 === 0 ? "0 0 10px rgba(139, 92, 246, 0.2)" : "none", // Reduced glow
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                animation: `ripple ${3 + i * 0.3}s ease ${i * 0.25}s infinite`,
                "--max-opacity": opacity,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";

"use client";

import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface NeonColorsProps {
  firstColor: string;
  secondColor: string;
}

interface NeonGradientCardProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the card
   * */
  as?: ReactElement;
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string;

  /**
   * @default ""
   * @type ReactNode
   * @description
   * The children of the card
   * */
  children?: ReactNode;

  /**
   * @default 5
   * @type number
   * @description
   * The size of the border in pixels
   * */
  borderSize?: number;

  /**
   * @default 20
   * @type number
   * @description
   * The size of the radius in pixels
   * */
  borderRadius?: number;

  /**
   * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
   * @type string
   * @description
   * The colors of the neon gradient
   * */
  neonColors?: NeonColorsProps;

  [key: string]: any;
}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1",
  },
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);

  // Custom animation style
  const animationStyle = `
    @keyframes backgroundPositionSpin {
      0% { background-position: top center; }
      100% { background-position: bottom center; }
    }
  `;

  return (
    <div
      ref={containerRef}
      style={
        {
          "--border-size": `${borderSize}px`,
          "--border-radius": `${borderRadius}px`,
          "--neon-first-color": neonColors.firstColor,
          "--neon-second-color": neonColors.secondColor,
          "--card-width": `${dimensions.width}px`,
          "--card-height": `${dimensions.height}px`,
          "--card-content-radius": `${borderRadius - borderSize}px`,
          "--pseudo-element-width": `${dimensions.width + borderSize * 2}px`,
          "--pseudo-element-height": `${dimensions.height + borderSize * 2}px`,
          "--after-blur": `${dimensions.width / 3}px`,
        } as CSSProperties
      }
      className={cn(
        "relative z-10 size-full rounded-[var(--border-radius)]",
        className,
      )}
      {...props}
    >
      <style jsx>{animationStyle}</style>
      <div
        className={cn(
          "relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] p-6",
          "before:absolute before:-left-[var(--border-size)] before:-top-[var(--border-size)] before:-z-10 before:block",
          "before:h-[var(--pseudo-element-height)] before:w-[var(--pseudo-element-width)] before:rounded-[var(--border-radius)] before:content-['']",
          "after:absolute after:-left-[var(--border-size)] after:-top-[var(--border-size)] after:-z-10 after:block",
          "after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-[''] after:opacity-80",
        )}
        style={{
          backgroundColor: "#121212", // Dark background for the card
        }}
      >
        {/* Before element with animation */}
        <div
          style={{
            position: "absolute",
            top: `-${borderSize}px`,
            left: `-${borderSize}px`,
            width: `${dimensions.width + borderSize * 2}px`,
            height: `${dimensions.height + borderSize * 2}px`,
            borderRadius: `${borderRadius}px`,
            backgroundImage: `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
            backgroundSize: "100% 200%",
            zIndex: -10,
            animation: "backgroundPositionSpin 3000ms infinite alternate",
          }}
        />
        
        {/* After element with blur and animation */}
        <div
          style={{
            position: "absolute",
            top: `-${borderSize}px`,
            left: `-${borderSize}px`,
            width: `${dimensions.width + borderSize * 2}px`,
            height: `${dimensions.height + borderSize * 2}px`,
            borderRadius: `${borderRadius}px`,
            backgroundImage: `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
            backgroundSize: "100% 200%",
            zIndex: -10,
            filter: `blur(${dimensions.width / 3}px)`,
            opacity: 0.8,
            animation: "backgroundPositionSpin 3000ms infinite alternate",
          }}
        />
        
        {children}
      </div>
    </div>
  );
};

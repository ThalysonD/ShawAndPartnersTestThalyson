import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";

defineElement(lottie.loadAnimation);

export type LordIconTrigger =
  | "hover"
  | "click"
  | "loop"
  | "loop-on-hover"
  | "morph"
  | "morph-two-way";

export type LordIconColors = {
  primary?: string;
  secondary?: string;
};

export type LordIconProps = {
  src?: string;
  trigger?: LordIconTrigger;
  colors?: LordIconColors;
  delay?: number;
  size?: number;
};

export const LordIcon: React.FC<LordIconProps> = ({
  colors,
  src,
  size,
  trigger,
  delay,
}) => {
  const primaryColor = colors?.primary || "#2835ad";
  const secondaryColor = colors?.secondary || "#461a9e";

  return (
    <lord-icon
      colors={`primary:${primaryColor},secondary:${secondaryColor}`}
      src={src}
      trigger={trigger}
      delay={delay}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

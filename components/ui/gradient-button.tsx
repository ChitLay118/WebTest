import { Pressable, Text, type PressableProps, type ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "@/lib/utils";

export interface GradientButtonProps extends Omit<PressableProps, "style"> {
  children: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Gradient button with emerald green theme.
 * Used for primary actions like transfer submission, login, etc.
 */
export function GradientButton({
  children,
  className,
  disabled,
  ...props
}: GradientButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => ({
        opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
      })}
      {...props}
    >
      <LinearGradient
        colors={["#10b981", "#059669"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={cn("rounded-3xl py-4 px-6 items-center justify-center shadow-lg", className)}
      >
        <Text className="text-white font-bold text-center text-base">{children}</Text>
      </LinearGradient>
    </Pressable>
  );
}

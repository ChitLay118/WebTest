import { View, type ViewProps } from "react-native";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends ViewProps {
  className?: string;
}

/**
 * Glass-morphism card component with emerald border and backdrop blur effect.
 * Used for displaying rates, payment methods, and notifications.
 */
export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <View
      className={cn(
        "bg-surface/70 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg",
        className
      )}
      {...props}
    />
  );
}

import { View, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MessageToastProps {
  message: string;
  type?: "success" | "error";
  visible: boolean;
  onHide?: () => void;
  duration?: number;
}

/**
 * Toast message component for displaying success/error notifications.
 * Automatically hides after duration.
 */
export function MessageToast({
  message,
  type = "success",
  visible,
  onHide,
  duration = 4000,
}: MessageToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide?.());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const bgColor = type === "success" ? "from-emerald-600 to-teal-700" : "from-rose-600 to-red-700";
  const icon = type === "success" ? "✓" : "!";

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        position: "absolute",
        top: 24,
        left: "5%",
        right: "5%",
        zIndex: 110,
      }}
    >
      <View
        className={cn(
          "bg-gradient-to-r",
          bgColor,
          "text-white p-4 rounded-2xl shadow-2xl flex-row items-center space-x-3 border border-white/20"
        )}
      >
        <Text className="text-white text-xl font-bold">{icon}</Text>
        <Text className="text-white font-medium text-sm flex-1">{message}</Text>
      </View>
    </Animated.View>
  );
}

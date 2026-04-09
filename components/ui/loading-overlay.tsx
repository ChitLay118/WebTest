import { View, Text, ActivityIndicator } from "react-native";

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

/**
 * Full-screen loading overlay with spinner and optional message.
 */
export function LoadingOverlay({ visible, message = "ခဏစောင့်ပေးပါ..." }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center">
      <View className="flex flex-col items-center">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="mt-4 text-emerald-400 font-medium">{message}</Text>
      </View>
    </View>
  );
}

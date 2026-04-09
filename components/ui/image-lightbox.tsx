import { Modal, View, Image, Pressable, Text } from "react-native";
import { useState, useCallback } from "react";

export interface ImageLightboxProps {
  imageUrl: string | null;
  onClose: () => void;
}

/**
 * Full-screen image lightbox modal for viewing QR codes and receipts.
 */
export function ImageLightbox({ imageUrl, onClose }: ImageLightboxProps) {
  if (!imageUrl) return null;

  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <Pressable
        onPress={onClose}
        className="flex-1 bg-black/95 flex items-center justify-center p-5"
      >
        <Image
          source={{ uri: imageUrl }}
          className="w-full max-h-full rounded-lg shadow-2xl"
          resizeMode="contain"
        />
        <Text className="absolute bottom-10 text-white/50 text-sm italic">
          ပိတ်ရန် ပုံကို တစ်ချက်နှိပ်ပါ
        </Text>
      </Pressable>
    </Modal>
  );
}

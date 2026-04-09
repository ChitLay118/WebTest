import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable, Image } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { db, PUBLIC_DATA_PATH } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface ExchangeRates {
  THB_TO_MMK: number;
  THB_TO_MMK_PHONE: number;
  lastUpdated: string;
}

interface BankInfo {
  image1URL: string;
  image2URL: string;
  image3URL: string;
  image4URL: string;
  wavePayURL: string;
  kpayURL: string;
}

export default function HomeScreen() {
  const [rates, setRates] = useState<ExchangeRates>({
    THB_TO_MMK: 80,
    THB_TO_MMK_PHONE: 80,
    lastUpdated: "Loading...",
  });
  const [bankInfo, setBankInfo] = useState<BankInfo>({
    image1URL: "",
    image2URL: "",
    image3URL: "",
    image4URL: "",
    wavePayURL: "",
    kpayURL: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeRates = onSnapshot(
      doc(db, PUBLIC_DATA_PATH, "rates", "current"),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setRates({
            THB_TO_MMK: data.rateBuyMMK || 80,
            THB_TO_MMK_PHONE: data.rateBuyMMKPhone || 80,
            lastUpdated: data.lastUpdated
              ? new Date(data.lastUpdated.seconds * 1000).toLocaleString("my-MM")
              : "ယခုတင်",
          });
        }
      }
    );

    const unsubscribeBankInfo = onSnapshot(
      doc(db, PUBLIC_DATA_PATH, "config", "bankInfo"),
      (snapshot) => {
        if (snapshot.exists()) {
          setBankInfo((prev) => ({ ...prev, ...snapshot.data() }));
        }
      }
    );

    return () => {
      unsubscribeRates();
      unsubscribeBankInfo();
    };
  }, []);

  const rateBank = (100000 / rates.THB_TO_MMK).toFixed(2);
  const ratePhone = (10000 / rates.THB_TO_MMK_PHONE).toFixed(2);

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="space-y-6">
          {/* Header */}
          <View className="flex-row justify-between items-end px-2">
            <View>
              <Text className="text-xl font-bold text-foreground">ယနေ့ငွေလဲနှုန်း</Text>
              <Text className="text-xs text-muted">Update: {rates.lastUpdated}</Text>
            </View>
            <View className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/20">
              <Text className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Live
              </Text>
            </View>
          </View>

          {/* Rate Cards */}
          <View className="gap-4">
            {/* Bank Transfer Rate */}
            <GlassCard className="p-6 border-emerald-500/10">
              <Text className="text-emerald-400 font-bold text-sm mb-4">
                💳 ဘဏ်ထဲသို့ငွေထည့်ရန်
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="items-center">
                  <Text className="text-[10px] text-muted uppercase">ဘတ်</Text>
                  <Text className="text-2xl font-black text-foreground">{rateBank}</Text>
                </View>
                <Text className="text-emerald-500 text-lg">→</Text>
                <View className="items-center">
                  <Text className="text-[10px] text-muted uppercase">ကျပ်</Text>
                  <Text className="text-2xl font-black text-foreground">100,000</Text>
                </View>
              </View>
            </GlassCard>

            {/* Phone Bill Rate */}
            <GlassCard className="p-6 border-blue-500/10">
              <Text className="text-blue-400 font-bold text-sm mb-4">
                📱 ဖုန်းဘေဖြည့်ရန် (၁ သောင်းနှုန်း)
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="items-center">
                  <Text className="text-[10px] text-muted uppercase">ဘတ်</Text>
                  <Text className="text-2xl font-black text-foreground">{ratePhone}</Text>
                </View>
                <Text className="text-blue-500 text-lg">→</Text>
                <View className="items-center">
                  <Text className="text-[10px] text-muted uppercase">ကျပ်</Text>
                  <Text className="text-2xl font-black text-foreground">10,000</Text>
                </View>
              </View>
            </GlassCard>
          </View>

          {/* Payment Accounts */}
          <View className="space-y-4">
            <Text className="text-sm font-bold text-muted px-2 uppercase tracking-widest">
              Payment Accounts
            </Text>
            <View className="grid grid-cols-2 gap-3">
              {[
                bankInfo.image1URL,
                bankInfo.image2URL,
                bankInfo.image3URL,
                bankInfo.image4URL,
              ].map((url, i) => (
                <Pressable
                  key={i}
                  onPress={() => url && setSelectedImage(url)}
                  className="active:opacity-70"
                >
                  <GlassCard className="p-2">
                    <Image
                      source={{
                        uri: url || "https://placehold.co/200x100?text=QR",
                      }}
                      className="w-full h-24 rounded-xl mb-2"
                      resizeMode="cover"
                    />
                  </GlassCard>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Image Lightbox */}
      <ImageLightbox imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </ScreenContainer>
  );
}

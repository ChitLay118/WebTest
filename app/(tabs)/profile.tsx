import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { MessageToast } from "@/components/ui/message-toast";
import { useAuthContext } from "@/lib/auth-context";
import { db, PUBLIC_DATA_PATH } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { router } from "expo-router";

interface Transfer {
  id: string;
  amountTHB: number;
  amountMMK: number;
  status: "Pending" | "Completed";
  timestamp: any;
}

export default function ProfileScreen() {
  const { user, logout } = useAuthContext();
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(
    null
  );
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, PUBLIC_DATA_PATH, "transfers"), (snapshot) => {
      const userTransfers = snapshot.docs
        .map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Transfer)
        )
        .filter((t: any) => t.senderId === user.uid)
        .sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setTransfers(userTransfers);
    });

    return () => unsubscribe();
  }, [user]);

  const completedCount = transfers.filter((t) => t.status === "Completed").length;

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setMessage({ text: "ထွက်ပြီးပါပြီ", type: "success" });
      setShowMessage(true);
      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (error) {
      setMessage({ text: "အမှားရှိပါသည်", type: "error" });
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">အကောင့်ဝင်ပါ</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="space-y-6">
          {/* User Info Card */}
          <GlassCard className="p-8 items-center relative overflow-hidden">
            <View className="w-24 h-24 bg-slate-800/80 rounded-3xl flex items-center justify-center mb-4 border border-emerald-500/20 shadow-2xl">
              <Text className="text-5xl">👤</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground">
              {user.displayName || "WaiYan User"}
            </Text>
            <Text className="text-muted text-xs mb-6">{user.email}</Text>

            {/* Stats */}
            <View className="grid grid-cols-2 gap-4 w-full">
              <View className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 items-center">
                <Text className="text-[10px] text-muted uppercase font-black">စုစုပေါင်း</Text>
                <Text className="text-xl font-bold text-emerald-400">{transfers.length}</Text>
              </View>
              <View className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 items-center">
                <Text className="text-[10px] text-muted uppercase font-black">အောင်မြင်</Text>
                <Text className="text-xl font-bold text-blue-400">{completedCount}</Text>
              </View>
            </View>
          </GlassCard>

          {/* User Details */}
          <GlassCard className="p-6 space-y-4">
            <View className="flex-row items-center space-x-4">
              <View className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                <Text className="text-emerald-500/50">🆔</Text>
              </View>
              <View>
                <Text className="text-[10px] text-muted uppercase">User ID</Text>
                <Text className="text-[11px] font-medium text-foreground">{user.uid}</Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-4">
              <View className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                <Text className="text-emerald-500/50">🕐</Text>
              </View>
              <View>
                <Text className="text-[10px] text-muted uppercase">Join Date</Text>
                <Text className="text-[11px] font-medium text-foreground">
                  {user.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleString()
                    : "N/A"}
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Logout Button */}
          <Pressable onPress={handleLogout} disabled={loading}>
            <GlassCard className="w-full py-4 border-rose-500/20 items-center justify-center active:opacity-70">
              <Text className="text-rose-500 font-bold text-xs">အကောင့်မှ ထွက်မည်</Text>
            </GlassCard>
          </Pressable>

          {/* Transfer History */}
          <View className="space-y-4 pt-2">
            <Text className="text-xs font-bold text-muted px-2 uppercase tracking-widest">
              ငွေလွှဲမှုမှတ်တမ်း
            </Text>
            {transfers.length === 0 ? (
              <Text className="text-center text-muted py-8">ငွေလွှဲမှုမရှိသေးပါ</Text>
            ) : (
              transfers.map((transfer) => (
                <GlassCard key={transfer.id} className="p-4 flex-row items-center justify-between">
                  <View>
                    <Text className="text-xs font-bold text-foreground">
                      {transfer.amountTHB.toFixed(2)} THB ➜ {transfer.amountMMK.toFixed(0)} MMK
                    </Text>
                    <Text className="text-[10px] text-muted">
                      {transfer.timestamp?.toDate?.()?.toLocaleDateString?.() || "N/A"}
                    </Text>
                  </View>
                  <View
                    className={`text-[8px] px-2 py-1 rounded-full font-black ${
                      transfer.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    <Text
                      className={
                        transfer.status === "Completed"
                          ? "text-emerald-400"
                          : "text-amber-500"
                      }
                    >
                      {transfer.status.toUpperCase()}
                    </Text>
                  </View>
                </GlassCard>
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <LoadingOverlay visible={loading} />
      <MessageToast
        message={message?.text || ""}
        type={message?.type || "success"}
        visible={showMessage}
        onHide={() => setShowMessage(false)}
      />
    </ScreenContainer>
  );
}

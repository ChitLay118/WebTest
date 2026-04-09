import React, { useState } from "react";
import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientButton } from "@/components/ui/gradient-button";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { MessageToast } from "@/components/ui/message-toast";

type TransferTab = "account" | "phone-bill";

export default function TransferScreen() {
  const [tab, setTab] = useState<TransferTab>("account");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  // Bank Transfer State
  const [paymentMethod, setPaymentMethod] = useState<"WavePay" | "KPay" | null>(null);
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [senderPhoneTH, setSenderPhoneTH] = useState("");
  const [receiverPhoneMM, setReceiverPhoneMM] = useState("");
  const [amount, setAmount] = useState("");

  // Phone Bill State
  const [simNetwork, setSimNetwork] = useState<"ATOM" | "MPT" | "Mytel" | "U9" | null>(null);
  const [phoneBillNumber, setPhoneBillNumber] = useState("");

  const handleShowMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setShowMessage(true);
  };

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      handleShowMessage("ပမာဏထည့်ပါ", "error");
      return;
    }

    if (tab === "account" && !paymentMethod) {
      handleShowMessage("ငွေလွှဲနည်းလမ်းရွေးပါ", "error");
      return;
    }

    if (tab === "phone-bill" && !simNetwork) {
      handleShowMessage("SIM အမျိုးအစားရွေးပါ", "error");
      return;
    }

    setLoading(true);
    try {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      handleShowMessage("ငွေလွှဲတောင်းဆိုမှု အောင်မြင်ပါသည်", "success");
      // Reset form
      setAmount("");
      setPaymentMethod(null);
      setSimNetwork(null);
    } catch (error) {
      handleShowMessage("အမှားရှိပါသည်", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="space-y-6">
          {/* Tab Selector */}
          <GlassCard className="p-1 flex-row shadow-lg">
            <Pressable
              onPress={() => setTab("account")}
              className={`flex-1 py-3 rounded-xl items-center justify-center ${
                tab === "account" ? "bg-emerald-500" : ""
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  tab === "account" ? "text-white" : "text-muted"
                }`}
              >
                BANK
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTab("phone-bill")}
              className={`flex-1 py-3 rounded-xl items-center justify-center ${
                tab === "phone-bill" ? "bg-emerald-500" : ""
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  tab === "phone-bill" ? "text-white" : "text-muted"
                }`}
              >
                BILL
              </Text>
            </Pressable>
          </GlassCard>

          {/* Form Card */}
          <GlassCard className="p-6 shadow-xl">
            <Text className="text-lg font-bold text-foreground mb-4">
              {tab === "account" ? "ဘဏ်ထဲသို့ လွှဲမည်" : "ဖုန်းဘေထည့်မည်"}
            </Text>

            {tab === "account" ? (
              <View className="space-y-4">
                {/* Payment Method Selector */}
                <View className="grid grid-cols-2 gap-2">
                  {[
                    { name: "WavePay", icon: "💳" },
                    { name: "KPay", icon: "💳" },
                  ].map((method) => (
                    <Pressable
                      key={method.name}
                      onPress={() => setPaymentMethod(method.name as "WavePay" | "KPay")}
                      className={`p-3 rounded-xl border-2 items-center ${
                        paymentMethod === method.name
                          ? "bg-emerald-500/20 border-emerald-500"
                          : "border-white/10 bg-surface/50"
                      }`}
                    >
                      <Text className="text-2xl mb-1">{method.icon}</Text>
                      <Text className="text-[10px] font-bold text-foreground">
                        {method.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {/* Text Inputs */}
                <TextInput
                  placeholder="လွှဲသူအမည်"
                  placeholderTextColor="#94a3b8"
                  value={senderName}
                  onChangeText={setSenderName}
                  className="w-full p-4 rounded-2xl bg-surface text-foreground"
                />
                <TextInput
                  placeholder="လက်ခံသူအမည်"
                  placeholderTextColor="#94a3b8"
                  value={receiverName}
                  onChangeText={setReceiverName}
                  className="w-full p-4 rounded-2xl bg-surface text-foreground"
                />
                <TextInput
                  placeholder="ထိုင်းဖုန်းနံပါတ်"
                  placeholderTextColor="#94a3b8"
                  value={senderPhoneTH}
                  onChangeText={setSenderPhoneTH}
                  keyboardType="phone-pad"
                  className="w-full p-4 rounded-2xl bg-surface text-foreground"
                />
                <TextInput
                  placeholder="မြန်မာဖုန်းနံပါတ်"
                  placeholderTextColor="#94a3b8"
                  value={receiverPhoneMM}
                  onChangeText={setReceiverPhoneMM}
                  keyboardType="phone-pad"
                  className="w-full p-4 rounded-2xl bg-surface text-foreground"
                />
              </View>
            ) : (
              <View className="space-y-4">
                {/* SIM Network Selector */}
                <View className="grid grid-cols-4 gap-2">
                  {["ATOM", "MPT", "Mytel", "U9"].map((network) => (
                    <Pressable
                      key={network}
                      onPress={() => setSimNetwork(network as "ATOM" | "MPT" | "Mytel" | "U9")}
                      className={`p-2 rounded-xl border-2 items-center justify-center ${
                        simNetwork === network
                          ? "bg-emerald-500/20 border-emerald-500"
                          : "border-white/10 bg-surface/50"
                      }`}
                    >
                      <Text className="text-[8px] font-bold text-foreground">{network}</Text>
                    </Pressable>
                  ))}
                </View>

                <TextInput
                  placeholder="ဖုန်းနံပါတ်"
                  placeholderTextColor="#94a3b8"
                  value={phoneBillNumber}
                  onChangeText={setPhoneBillNumber}
                  keyboardType="phone-pad"
                  className="w-full p-4 rounded-2xl bg-surface text-foreground"
                />
              </View>
            )}

            {/* Amount Input */}
            <TextInput
              placeholder="ပမာဏထည့်ပါ (ဘတ်)"
              placeholderTextColor="#94a3b8"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              className="w-full p-4 rounded-2xl bg-surface text-foreground mt-4 font-bold"
            />

            {/* Submit Button */}
            <GradientButton
              onPress={handleSubmit}
              className="mt-6 w-full"
              disabled={loading}
            >
              ငွေလွှဲတောင်းဆိုမည်
            </GradientButton>
          </GlassCard>
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

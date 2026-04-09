import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable, Image } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { GlassCard } from "@/components/ui/glass-card";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { useAuthContext } from "@/lib/auth-context";
import { db, getUserNotificationsPath } from "@/lib/firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

interface Notification {
  id: string;
  title: string;
  message: string;
  imageURL?: string;
  isRead: boolean;
  timestamp: any;
}

export default function InboxScreen() {
  const { user } = useAuthContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      collection(db, getUserNotificationsPath(user.uid), "notifications"),
      (snapshot) => {
        const notifs = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          } as Notification))
          .sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
        setNotifications(notifs);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleMarkRead = async (id: string) => {
    if (!user) return;
    try {
      await updateDoc(
        doc(db, getUserNotificationsPath(user.uid), "notifications", id),
        { isRead: true }
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="space-y-4">
          <View className="flex-row items-center justify-between px-2">
            <Text className="text-xl font-bold text-foreground">အဝင်စာ (Inbox)</Text>
            {unreadCount > 0 && (
              <View className="bg-rose-500 px-2 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">{unreadCount}</Text>
              </View>
            )}
          </View>

          {notifications.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Text className="text-muted text-center">မက်ဆေ့ခ်ျမရှိသေးပါ</Text>
            </View>
          ) : (
            notifications.map((notif) => (
              <Pressable
                key={notif.id}
                onPress={() => handleMarkRead(notif.id)}
                className={`active:opacity-70 ${notif.isRead ? "opacity-60" : ""}`}
              >
                <GlassCard
                  className={`p-5 relative overflow-hidden ${
                    !notif.isRead ? "border-emerald-500/30" : ""
                  }`}
                >
                  {!notif.isRead && (
                    <View className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full m-3 shadow-lg" />
                  )}
                  <Text className="font-bold text-sm mb-1 text-foreground">{notif.title}</Text>
                  <Text className="text-muted text-xs mb-3">{notif.message}</Text>
                  {notif.imageURL && (
                    <Pressable onPress={() => setSelectedImage(notif.imageURL || null)}>
                      <Image
                        source={{ uri: notif.imageURL }}
                        className="rounded-xl max-h-40 w-full border border-white/5"
                        resizeMode="cover"
                      />
                    </Pressable>
                  )}
                </GlassCard>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      <ImageLightbox imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </ScreenContainer>
  );
}

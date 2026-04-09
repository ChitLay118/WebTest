import * as admin from "firebase-admin";

// Firebase Service Account credentials
const serviceAccount = {
  type: "service_account",
  project_id: "thaimyanmarmoneytransfer",
  private_key_id: "15ce4ab1fd672c2a68c93babfd30929bf5b3dd62",
  private_key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDPvroRh78uxIVG
NJuC5zJLrTN+IC+J32nVULm+nIimMLxn2y7tIxISVOsIhTPlMegAgWo17roYZcs1
tnPGxFqedxxrP2gR/ljs4kyNhPl81q8nqUe+uyUOPeT5iEbwJmj9LaAE8SU/HiQG
cOQ8FDOrTjNkVtHb6TiSQWDFKM+fi6qXVzgfQLRuihT5kHoWcNF12NA4GkI05P3k
LadBoBnODx972GRNNOXj6CLZrllK4uLPmBh7qQgf/Wi308BggMRB25dweNVuGUE1
WFnHTyH2bVOWOXfWEFQHekGxEqsMi7Bbs4Cyne1wOM/qmemOeIDxMAZHJvvjnwYO
kMEXaboBAgMBAAECggEADQbtINKJ+e8rms+LdWnVSPLRXO48gOksOCrN3P6woHhD
pkETuB3YASOHUgNVUeDfZyG2ZO+lhohilemNKMiRFKkMNIr3NhKkpaUarxCouuv0
85gdRj/yxsn5kO67YQ2NjZvF8i1jfCniES/U1hIfu9Ulapw5oHBHYn98R5zDqUHS
O9+QvpVj5hgAt0QsS9ZDibqnw7xnAN4X1g8utRtKTrkT5Bb0vEywvtNwyIDk19UL
/Arxe3JCl1a9NBq3MCCasj+RKQku/7vz73CyFEYa2GrE2Z9enKitGRphsyZ8x2tt
n499NO1q2zZlP1ErLRadcLMXrWLH1ATexE9wuTXcmQKBgQD1hUBx4R0NEBn8ZEj6
C/uerqNlnZksOduY188496dyPnyp23XTdTe8FBczvChUzWxxnfGfE5SqjX2RZP3F
bfk2oJGndb+HJVTF0w9Gj+G6N9pCsscpk7rbKBXjEx9g7al+tMObMcH9kM4MbD+2
JRq3NFTWYonvdf5zHKxjJdVx2QKBgQDYnLXw0YADAKmGuS60J+smVerMPxhBa7nj
fkEm9BfSZOKlhOxmRCg8abbniN/EhFJc2YqosZPmXmzmxi8MbClMtu1MVG9op6B5
Vb2pn9WNJl7ZFLTX2LbN4Im391oppgXMpSGi3u/WYwql/BR65GJfYGVmKr4A8J3a
r+k9QQFIaQKBgClTR3ijknc7aZRQ8POdhrm73WbiMwD9sBe243tMPBP/ro4MkXWJ
Olte6lTb69HyTbmGA0BqVFCsxiDt5cUQcK0gM8QDDrzZrL4re1u+JhlpA0TMwLcf
1YjD44M4GcT/29Km7HG321YpxHTU15h6AFgr58e6CEuVCcIoZl+944JpAoGBAMIK
gCGeSqJl8XcyZFgWelv5E0CsNLpGGltkOlD+0Gg036OOk4Z4/+I+gQ6gWnPcZTuv
1LqReQAhDkUcvADQ055ZL/H0oWiK4QJQgHp3KAItoUGtfuLsy7VZs4UNG8O7ae6M
7rjMJOVUC7HtQxtjg4wU+kCvgU2uPnosoy+wD8ohAoGASMT6GPlaesOBRxi1jU1c
Fj6ZhRPRrghp60C6xfw3wMelTKbFsU8yza+5/Aeon2Qe/6+U/AMPTiIpjdcULWww
LNx+HiHd6j6xVZZUbNDSVRTFMTb6q+ahNovbG0HGNF1xUxP+jMN2yJbmVcyeAQ4K
knpZ6fWd+GE+eizbVI6Yg1Q=
-----END PRIVATE KEY-----`,
  client_email: "firebase-adminsdk-fbsvc@thaimyanmarmoneytransfer.iam.gserviceaccount.com",
  client_id: "116892236992845450289",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40thaimyanmarmoneytransfer.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://thaimyanmarmoneytransfer.firebaseio.com",
  });
}

const db = admin.firestore();
const messaging = admin.messaging();

/**
 * Send a notification to a specific user
 */
export async function sendNotificationToUser(
  userId: string,
  title: string,
  message: string,
  imageURL?: string
) {
  try {
    const APP_ID = "thai-myanmar-remittance";
    const notificationRef = db.collection(`artifacts/${APP_ID}/users/${userId}/notifications`).doc();

    await notificationRef.set({
      title,
      message,
      imageURL: imageURL || null,
      isRead: false,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Notification sent to user ${userId}`);
    return { success: true, notificationId: notificationRef.id };
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}

/**
 * Send notifications to multiple users
 */
export async function sendNotificationToUsers(
  userIds: string[],
  title: string,
  message: string,
  imageURL?: string
) {
  const results = await Promise.all(
    userIds.map((userId) => sendNotificationToUser(userId, title, message, imageURL))
  );
  return results;
}

/**
 * Send FCM push notification to a device token
 */
export async function sendFCMNotification(
  deviceToken: string,
  title: string,
  body: string,
  data?: Record<string, string>
) {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      data: data || {},
      token: deviceToken,
    };

    const response = await messaging.send(message);
    console.log("FCM notification sent:", response);
    return { success: true, messageId: response };
  } catch (error) {
    console.error("Error sending FCM notification:", error);
    throw error;
  }
}

export { db, messaging, admin };

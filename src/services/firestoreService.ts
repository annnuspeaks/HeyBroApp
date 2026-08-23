import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from '@react-native-firebase/firestore';

import { ProfileType } from '../store/userStore';

const db = getFirestore();

export const saveUserProfile = async (uid: string, profile: ProfileType) => {
  await setDoc(doc(db, 'users', uid), {
    ...profile,
    updatedAt: new Date().toISOString(),
  });
};

export const getUserProfile = async (uid: string) => {
  const snapshot = await getDoc(doc(db, 'users', uid));

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data() as ProfileType;
};

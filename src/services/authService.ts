import {
  getAuth,
  signInWithPhoneNumber,
  signOut,
} from '@react-native-firebase/auth';

export const sendPhoneOtp = async (phoneNumber: string) => {
  const auth = getAuth();

  return signInWithPhoneNumber(auth, phoneNumber);
};

export const confirmPhoneOtp = async (confirmation: any, code: string) => {
  return confirmation.confirm(code);
};

export const getCurrentUser = () => {
  const auth = getAuth();

  return auth.currentUser;
};

export const signOutUser = async () => {
  const auth = getAuth();

  await signOut(auth);
};

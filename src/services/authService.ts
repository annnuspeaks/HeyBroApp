import {
  getAuth,
  signInWithPhoneNumber,
  signOut,
} from '@react-native-firebase/auth';

let otpConfirmation: any = null;
let otpPhoneNumber: string | null = null;

export const sendPhoneOtp = async (phoneNumber: string) => {
  const auth = getAuth();

  otpPhoneNumber = phoneNumber;
  otpConfirmation = await signInWithPhoneNumber(auth, phoneNumber);

  return otpConfirmation;
};

export const resendPhoneOtp = async () => {
  if (!otpPhoneNumber) {
    throw new Error('Phone number is missing. Please request OTP again.');
  }

  const auth = getAuth();

  otpConfirmation = await signInWithPhoneNumber(auth, otpPhoneNumber);

  return otpConfirmation;
};

export const confirmPhoneOtp = async (code: string) => {
  if (!otpConfirmation) {
    throw new Error('OTP session has expired. Please request a new OTP.');
  }

  const result = await otpConfirmation.confirm(code);

  otpConfirmation = null;

  return result;
};

export const clearOtpConfirmation = () => {
  otpConfirmation = null;
  otpPhoneNumber = null;
};

export const getCurrentUser = () => {
  const auth = getAuth();

  return auth.currentUser;
};

export const signOutUser = async () => {
  const auth = getAuth();

  await signOut(auth);
};

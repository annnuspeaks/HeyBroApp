import {create} from 'zustand';

type ProfileType = {
  name: string;
  phone: string;
  image: string;
  bio?: string;
  gender?: string;
  qualification?: string;
  dob?: string;
  email?: string;
  website?: string;
};

type UserStoreType = {
  profile: ProfileType;

  setProfile: (data: Partial<ProfileType>) => void;
};

export const useUserStore = create<UserStoreType>(set => ({
  profile: {
    name: 'The Anurag Shukla',
    phone: '+91 7068515424',
    image: 'https://i.pravatar.cc/300',
    bio: '',
    gender: '',
    qualification: '',
    dob: '',
    email: '',
    website: '',
  },

  setProfile: data =>
    set(state => ({
      profile: {
        ...state.profile,
        ...data,
      },
    })),
}));
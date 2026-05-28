import {create} from 'zustand';

export const useUserStore = create(set => ({
  profile: {
    name: 'Harshvardhan',
    phone: '+91 9876543210',
    bio: '',
    website: '',
    image: 'https://i.pravatar.cc/300',
    gender: '',
    qualification: '',
    dob: '',
    email: '',
  },

  setProfile: (updatedProfile: any) =>
    set({
      profile: updatedProfile,
    }),
}));
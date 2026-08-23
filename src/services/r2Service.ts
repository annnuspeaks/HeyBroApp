const MEDIA_API_URL = 'https://heybro-media-api.anushukla101997.workers.dev';

export const uploadProfileImage = async (
  fileUri: string,
  contentType: string,
) => {
  const fileResponse = await fetch(fileUri);

  if (!fileResponse.ok) {
    throw new Error('Failed to read selected image');
  }

  const blob = await fileResponse.blob();

  const response = await fetch(`${MEDIA_API_URL}/profile/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
    },
    body: blob,
  });

  if (!response.ok) {
    throw new Error('Failed to upload profile image');
  }

  return response.json();
};

export const deleteProfileImage = async (imageUrl: string) => {
  if (!imageUrl || !imageUrl.includes('/profile/')) {
    return;
  }

  const url = new URL(imageUrl);

  const encodedKey = url.pathname.substring('/profile/'.length);

  if (!encodedKey) {
    return;
  }

  const response = await fetch(`${MEDIA_API_URL}/profile/${encodedKey}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete old profile image');
  }

  return response.json();
};

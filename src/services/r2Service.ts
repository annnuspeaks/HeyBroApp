const MEDIA_API_URL =
  'https://heybro-media-api.anushukla101997.workers.dev';

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
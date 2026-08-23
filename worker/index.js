export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);

    // Health check
    if (request.method === 'GET' && url.pathname === '/') {
      return new Response('HeyBro Media API is running!', {
        headers: corsHeaders,
      });
    }

    // Profile image upload
    if (request.method === 'POST' && url.pathname === '/profile/upload') {
      try {
        const contentType = request.headers.get('content-type') || '';

        if (!contentType.startsWith('image/')) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Only image uploads are allowed.',
            }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            },
          );
        }

        const contentLength = Number(
          request.headers.get('content-length') || '0',
        );

        // Maximum 5 MB
        if (contentLength > 5 * 1024 * 1024) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Image size must be 5 MB or less.',
            }),
            {
              status: 413,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            },
          );
        }

        const extension = contentType.split('/')[1]?.split(';')[0] || 'jpg';

        const objectKey = `profiles/${crypto.randomUUID()}.${extension}`;

        await env.MEDIA_BUCKET.put(objectKey, request.body, {
          httpMetadata: {
            contentType,
          },
        });

        // URL through this Worker
        const imageUrl = `${url.origin}/profile/${encodeURIComponent(
          objectKey,
        )}`;

        return new Response(
          JSON.stringify({
            success: true,
            key: objectKey,
            url: imageUrl,
          }),
          {
            status: 201,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          },
        );
      } catch (error) {
        console.error('Profile upload error:', error);

        return new Response(
          JSON.stringify({
            success: false,
            error: 'Upload failed.',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          },
        );
      }
    }

    // Delete profile image from R2
    if (request.method === 'DELETE' && url.pathname.startsWith('/profile/')) {
      try {
        const encodedKey = url.pathname.substring('/profile/'.length);

        const objectKey = decodeURIComponent(encodedKey);

        // Safety: only profile objects can be deleted
        if (!objectKey.startsWith('profiles/')) {
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Invalid profile image key.',
            }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
              },
            },
          );
        }

        await env.MEDIA_BUCKET.delete(objectKey);

        return new Response(
          JSON.stringify({
            success: true,
            key: objectKey,
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          },
        );
      } catch (error) {
        console.error('Profile image delete error:', error);

        return new Response(
          JSON.stringify({
            success: false,
            error: 'Delete failed.',
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          },
        );
      }
    }

    // Serve profile image from R2
    if (request.method === 'GET' && url.pathname.startsWith('/profile/')) {
      try {
        const encodedKey = url.pathname.substring('/profile/'.length);

        const objectKey = decodeURIComponent(encodedKey);

        const object = await env.MEDIA_BUCKET.get(objectKey);

        if (!object) {
          return new Response('Image not found', {
            status: 404,
            headers: corsHeaders,
          });
        }

        const headers = new Headers(corsHeaders);

        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);

        return new Response(object.body, {
          headers,
        });
      } catch (error) {
        console.error('Profile image fetch error:', error);

        return new Response('Failed to fetch image', {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    return new Response('Not Found', {
      status: 404,
      headers: corsHeaders,
    });
  },
};

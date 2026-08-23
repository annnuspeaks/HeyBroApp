export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);

    // Health check
    if (request.method === "GET" && url.pathname === "/") {
      return new Response("HeyBro Media API is running!", {
        headers: corsHeaders,
      });
    }

    // Profile image upload
    if (request.method === "POST" && url.pathname === "/profile/upload") {
      try {
        const contentType = request.headers.get("content-type") || "";

        if (!contentType.startsWith("image/")) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Only image uploads are allowed.",
            }),
            {
              status: 400,
              headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
              },
            }
          );
        }

        const contentLength = Number(
          request.headers.get("content-length") || "0"
        );

        // Maximum 5 MB
        if (contentLength > 5 * 1024 * 1024) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Image size must be 5 MB or less.",
            }),
            {
              status: 413,
              headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
              },
            }
          );
        }

        const extension =
          contentType.split("/")[1]?.split(";")[0] || "jpg";

        const objectKey = `profiles/${crypto.randomUUID()}.${extension}`;

        await env.MEDIA_BUCKET.put(objectKey, request.body, {
          httpMetadata: {
            contentType,
          },
        });

        return new Response(
          JSON.stringify({
            success: true,
            key: objectKey,
          }),
          {
            status: 201,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      } catch (error) {
        console.error("Profile upload error:", error);

        return new Response(
          JSON.stringify({
            success: false,
            error: "Upload failed.",
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }
    }

    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders,
    });
  },
};
export async function onRequest(context) {
  const requestUrl = new URL(context.request.url)
  const targetUrl = requestUrl.searchParams.get("url")

  if (!targetUrl) {
    return new Response("Missing 'url' parameter.", { status: 400 })
  }

  try {
    const res = await fetch(targetUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.google.com/"
      }
    })
    const contentType = res.headers.get("content-type") || "image/jpeg"
    const data = await res.arrayBuffer()

    return new Response(data, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=3600"
      }
    })
  } catch (err) {
    return new Response("Failed to fetch image.", { status: 500 })
  }
}

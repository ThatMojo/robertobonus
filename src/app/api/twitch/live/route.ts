import { NextResponse } from "next/server"

const TWITCH_CHANNEL = "robertovstheworld"

export async function GET() {
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ live: false })
  }

  try {
    // Get app access token
    const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    })

    if (!tokenRes.ok) return NextResponse.json({ live: false })

    const { access_token } = await tokenRes.json()

    // Check stream status
    const streamRes = await fetch(
      `https://api.twitch.tv/helix/streams?user_login=${TWITCH_CHANNEL}`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 60 },
      }
    )

    if (!streamRes.ok) return NextResponse.json({ live: false })

    const { data } = await streamRes.json()

    return NextResponse.json({
      live: data.length > 0,
      viewers: data[0]?.viewer_count ?? 0,
    })
  } catch {
    return NextResponse.json({ live: false })
  }
}

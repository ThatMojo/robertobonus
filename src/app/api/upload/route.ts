import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { auth } from "@/auth"

export async function POST(request: NextRequest) {
  // Auth check — only admins can upload
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  // Validate file type
  const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed: PNG, JPG, WebP, SVG, GIF" },
      { status: 400 }
    )
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large. Max 5MB" },
      { status: 400 }
    )
  }

  // Generate unique filename
  const ext = file.name.split(".").pop()?.toLowerCase() || "png"
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase()
    .slice(0, 50)
  const uniqueName = `${safeName}-${Date.now()}.${ext}`

  // Write file to public/uploads/
  const uploadDir = path.join(process.cwd(), "public", "uploads")
  await mkdir(uploadDir, { recursive: true })

  const bytes = new Uint8Array(await file.arrayBuffer())
  const filePath = path.join(uploadDir, uniqueName)
  await writeFile(filePath, bytes)

  return NextResponse.json({
    url: `/uploads/${uniqueName}`,
    name: uniqueName,
  })
}

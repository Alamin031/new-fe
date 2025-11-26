const IMAGEKIT_URL = "https://ik.imagekit.io/demo"

interface ImageKitOptions {
  width?: number
  height?: number
  quality?: number
  format?: "auto" | "webp" | "jpg" | "png"
  blur?: number
}

export function getImageKitUrl(path: string, options: ImageKitOptions = {}): string {
  const { width, height, quality = 80, format = "auto", blur } = options

  const transforms: string[] = []

  if (width) transforms.push(`w-${width}`)
  if (height) transforms.push(`h-${height}`)
  if (quality) transforms.push(`q-${quality}`)
  if (format) transforms.push(`f-${format}`)
  if (blur) transforms.push(`bl-${blur}`)

  const transformString = transforms.length > 0 ? `tr:${transforms.join(",")}` : ""

  return `${IMAGEKIT_URL}/${transformString}/${path}`
}

export function getPlaceholderUrl(path: string): string {
  return getImageKitUrl(path, { width: 20, quality: 10, blur: 10 })
}

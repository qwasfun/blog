import { geolocation, ipAddress } from '@vercel/functions'

export function GET(request) {
  const ip = ipAddress(request)

  const geo = geolocation(request)

  const result = { ip, geo }

  return Response.json(result)
}

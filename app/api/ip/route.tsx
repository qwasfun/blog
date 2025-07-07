import { geolocation, ipAddress } from '@vercel/functions'

export function GET(request) {
  const ip = ipAddress(request)

  const details = geolocation(request)

  const result = { ip, details }

  return Response.json(result)
}

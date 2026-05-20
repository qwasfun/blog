import TripListPage, {
  generateTripListMetadata,
} from 'app/components/TripListPage'

export const metadata = generateTripListMetadata()

export default function Page() {
  return <TripListPage />
}

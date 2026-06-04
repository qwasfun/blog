import { generatePostMetadata, generatePostStaticParams } from 'app/components/GenericPostPage'
import TripPostPage from 'app/components/TripPostPage'
import { folder } from '../config'

export async function generateStaticParams() {
  return generatePostStaticParams(folder)
}

export async function generateMetadata(props) {
  const params = await props.params
  return generatePostMetadata(folder, params.slug)
}

export default async function Page(props) {
  const params = await props.params
  return <TripPostPage slug={params.slug} />
}

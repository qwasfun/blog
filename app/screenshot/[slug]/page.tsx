import GenericPostPage, {
  generatePostStaticParams,
  generatePostMetadata,
} from 'app/components/GenericPostPage'
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
  return <GenericPostPage folder={folder} slug={params.slug} />
}

import GenericPostPage, {
  generatePostStaticParams,
  generatePostMetadata,
} from 'app/components/GenericPostPage'

export const folder = 'selfhosted'

export async function generateStaticParams() {
  return generatePostStaticParams(folder)
}

export async function generateMetadata(props) {
  const params = await props.params
  return generatePostMetadata(folder, 'index')
}

export default async function Page(props) {
  const params = await props.params
  return <GenericPostPage folder={folder} slug="index" />
}

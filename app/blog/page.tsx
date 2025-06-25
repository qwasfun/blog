import GenericListPage, {
  generateListMetadata,
} from 'app/components/GenericListPage'
import { folder } from './config'

export const metadata = generateListMetadata(folder)

export default function Page() {
  return <GenericListPage folder={folder} />
}

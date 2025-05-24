import { siteTitle } from 'app/config'
import { ExcalidrawList } from '../excalidraws/ExcalidrawList'
import { getExcalidrawList } from 'app/utils/utils'
import { metadataBase } from 'app/components/metadataBase'

export const metadata = {
  ...metadataBase,
  title: 'Excalidraw - ' + siteTitle,
}

const Page = () => {
  const list = getExcalidrawList()

  return <ExcalidrawList list={list}/>
}

export default Page

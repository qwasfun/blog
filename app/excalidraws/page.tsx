import { ExcalidrawList } from '../excalidraws/ExcalidrawList'
import { getExcalidrawList } from 'app/utils/utils'

const Page = () => {
  const list = getExcalidrawList()

  return <ExcalidrawList list={list} />
}

export default Page

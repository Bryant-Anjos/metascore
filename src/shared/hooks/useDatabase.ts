import { useContext } from 'react'

import { DatabaseContext } from '@src/components/contexts/DatabaseProvider'

export default function useDatabase() {
  return useContext(DatabaseContext)
}

import { useContext } from 'react'

import { GoalsContext } from '@src/components/contexts/GoalsProvider'

export default function useGoals() {
  return useContext(GoalsContext)
}

import { useContext } from 'react'

import { TranslationContext } from '@src/components/contexts/TranslationProvider'

export default function useTranslation() {
  return useContext(TranslationContext)
}

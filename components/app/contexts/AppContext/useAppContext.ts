import { useContext } from 'react'
import { AppContext } from '.'

export function useAppContext() {
  return useContext(AppContext)
}

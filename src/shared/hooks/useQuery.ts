import { useLocation } from 'oh-router-react'
import qs from 'qs'

export function useQuery<T = any>() {
  const location = useLocation()
  let search = location?.search || ''
  if (search.startsWith('?')) {
    search = search.replace('?', '')
  }
  return qs.parse(search) as T
}


import { AuthMode } from './models'
import { fetcher } from './fetcher'

// Auth actions
export const auth = (
  mode: AuthMode,
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body)
}

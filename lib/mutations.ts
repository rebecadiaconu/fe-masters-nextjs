import { AuthMode } from './EndpointsModels'
import { fetcher } from './fetcher'

// Auth actions
export const auth = (
  mode: AuthMode,
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body)
}

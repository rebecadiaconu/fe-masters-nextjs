import AuthForm from '../components/authForm'
import { AuthMode } from '../lib/EndpointsModels'

const SignIn = () => {
  return <AuthForm mode={AuthMode.SIGN_IN} />
}

SignIn.authPage = true

export default SignIn

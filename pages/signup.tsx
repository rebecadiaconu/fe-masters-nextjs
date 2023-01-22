import AuthForm from '../components/authForm'
import { AuthMode } from '../lib/EndpointsModels'

const SignUp = () => {
  return <AuthForm mode={AuthMode.SIGN_UP} />
}

SignUp.authPage = true

export default SignUp

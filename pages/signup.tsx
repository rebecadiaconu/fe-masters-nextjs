import AuthForm from '../components/authForm'
import { AuthMode } from '../lib/models'

const SignUp = () => {
  return <AuthForm mode={AuthMode.SIGN_UP} />
}

SignUp.authPage = true

export default SignUp


import Formgroup from '../components/Formgroup';
import "../Styles/Login.scss";

const Login = () => {
  return (
    <main className='login-page'>
      <div className='form-container'>
        <h1>Login</h1>
        <form >
          <Formgroup
          label="Email"
          placeholder="Enter You Email"
          />
          <Formgroup
          label="Password"
          placeholder="Enter Your Passord"
          />

          <button type='submit' className='button'>
            Login
          </button>

          
          
        </form>
        <p></p>
      </div>

    </main>
  )
}

export default Login

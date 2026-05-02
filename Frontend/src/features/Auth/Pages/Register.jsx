
import Formgroup from '../components/Formgroup';
import "../Styles/Login.scss";
import {Link} from "react-router"

const Register = () => {
  return (
    <main className='login-page'>
      <div className='form-container'>
        <h1>Register</h1>
        <form >
          <Formgroup
          label="Username"
          placeholder="Enter You Username"
          />
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
      
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

    </main>
  )
}

export default Register

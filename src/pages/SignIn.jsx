import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const SignIn = ({ user, setUser }) => {
  let navigate = useNavigate()

  let initialState = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formValues)
    try {
      const payload = await SignInUser(formValues)
      setFormValues(initialState)
      console.log("payload is", payload)
      
      setUser(payload)
      navigate('/')
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      // Display error message to user
      setErrorMessage('Failed to sign in. Please check your email and password.')
    }
  }

  return (
    <div className="signin col">
      <div className="card-overlay1 centered">
        <form className="col" onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <button
            className="submit"
            disabled={!formValues.email || !formValues.password}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn

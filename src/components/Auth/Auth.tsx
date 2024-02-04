// Auth.tsx
import { useState } from 'react'
import { useLoginMutation } from './Auth.api'
import { fetchUserData } from '../../utils/api'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { isLoading, error }] = useLoginMutation()
  const handleLogin = () => {
    login({ email, password })
      .unwrap()
      .then(async (response) => {
        const authToken = JSON.parse(JSON.stringify(response))
        console.log('Login successful', authToken.auth_token)
        localStorage.setItem('access_token', authToken.auth_token)

        try {
          const userData = await fetchUserData()
          localStorage.setItem('userData', JSON.stringify(userData))
          if (userData.role === 'supervisor') {
            window.location.href = '/employees'
          }
          if (userData.role === 'employee') {
            window.location.href = '/profile'
          }
        } catch (userDataError) {
          console.error('Failed to fetch user data', userDataError)
        }
      })
      .catch((error) => {
        console.error('Login failed', error)
      })
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit' onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && (
        <div style={{ color: 'red' }}>
          {'status' in error && error.status
            ? `Error ${error.status}: ${error.data}`
            : 'An error occurred.'}
        </div>
      )}
    </div>
  )
}

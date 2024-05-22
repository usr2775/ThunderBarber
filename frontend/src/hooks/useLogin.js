import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// Custom hook for handling login functionality
export const useLogin = () => {
  // State variables for error handling and loading state
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  // Accessing authentication context using custom hook
  const { dispatch } = useAuthContext()

  // Function to handle login
  const login = async (email, password) => {
    // Set loading state and clear any previous errors
    setIsLoading(true)
    setError(null)

    // Send a POST request to the login endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    // If the response is not ok, set error state
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    // If the response is ok, save user data to local storage, update authentication context, and clear loading state
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'LOGIN', payload: json })
      setIsLoading(false)
    }
  }

  // Return login function, loading state, and error state
  return { login, isLoading, error }
}

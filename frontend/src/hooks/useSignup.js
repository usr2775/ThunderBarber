import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ firstName, lastName, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // Guardar a la usuario en el almacenamiento local
      localStorage.setItem('user', JSON.stringify(json))

      // actualizar el contexto de autenticación
      dispatch({type: 'LOGIN', payload: json})

      // actualizar estado de carga
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
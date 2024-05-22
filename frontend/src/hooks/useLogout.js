import { useAuthContext } from './useAuthContext'
import { useAppointmentsContext } from './useAppointmentsContext'

// Custom hook for handling logout functionality
export const useLogout = () => {
    // Accessing authentication context and appointments context using custom hooks
    const { dispatch } = useAuthContext()
    const { dispatch: appointmentsDispatch } = useAppointmentsContext()

    // Function to handle logout
    const logout = () => {
        // Remove user data from local storage
        localStorage.removeItem('user')

        // Dispatch action to logout user and clear appointments context
        dispatch({ type: 'LOGOUT' })
        appointmentsDispatch({ type: 'SET_APPOINTMENTS', payload: null })
    }

    // Return logout function
    return { logout }
}

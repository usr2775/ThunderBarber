import { useAuthContext } from './useAuthContext'
import { useAppointmentsContext } from './useAppointmentsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: appointmentsDispatch } = useAppointmentsContext()

    const logout = () => {
        // Eliminar a la usuario del almacenamiento
        localStorage.removeItem('user')

        // cerrar sesión
        dispatch({type: 'LOGOUT'})
        appointmentsDispatch({type: 'SET_APPOINTMENTS', payload: null})
    }

    return {logout}
}
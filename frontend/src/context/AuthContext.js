import { createContext, useReducer, useEffect } from "react";

// Creamos el contexto para la autenticación
export const AuthContext = createContext();

// Definimos el reducer para gestionar el estado de la autenticación
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }; // Iniciar sesión, establecer el usuario
    case "LOGOUT":
      return { user: null }; // Cerrar sesión, eliminar el usuario
    case "UPDATE_USER":
      return {
        // Actualizar información del usuario (se asume que se eliminan citas)
        user: state.appointments.filter((a) => a._id !== action.payload._id),
      };
    default:
      return state;
  }
};

// Definimos el proveedor del contexto para la autenticación
export const AuthContextProvider = ({ children }) => {
  // Usamos el reducer para gestionar el estado de la autenticación
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // Inicialmente no hay usuario autenticado
  });

  // Efecto secundario para cargar el usuario desde el almacenamiento local cuando el componente se monta
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // Si se encuentra un usuario en el almacenamiento local, se inicia sesión automáticamente
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []); // Este efecto solo se ejecuta una vez, cuando el componente se monta

  // Mostramos el estado actual del contexto de autenticación en la consola
  console.log("AuthContext state: ", state);

  // Proporcionamos el estado y las funciones de despacho a través del contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useReducer } from 'react';

// Creamos un contexto con un valor inicial vacío
const GlobalStateContext = createContext(null);

export const GlobalStateProvider = ({ children }) => {
  const initialState = {
    documento: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DOCUMENTO':
        return { ...state, documento: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState debe utilizarse dentro de un GlobalStateProvider');
  }
  return context;
};

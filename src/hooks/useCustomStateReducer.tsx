import { useReducer, useRef } from "react";

// Action türleri
type Action<T> =
  | { type: "UPDATE"; payload: { key: keyof T; value: any } }
  | { type: "RESET" };

// Custom Reducer
function useCustomStateReducer<T extends object>(initialState: T) {
  const initialStateRef = useRef(initialState);

  const [state, dispatch] = useReducer(
    (state: T, action: Action<T>) => {
      switch (action.type) {
        case "UPDATE":
          return {
            ...state,
            [action.payload.key]: action.payload.value,
          };
        case "RESET":
          return initialStateRef.current;
        default:
          return state;
      }
    },
    initialState
  );

  const update = <K extends keyof T>(key: K, value: T[K]) => {
    dispatch({ type: "UPDATE", payload: { key, value } });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const get = <K extends keyof T>(key: K): T[K] => state[key];

  return { state, update, reset, get };
}

export default useCustomStateReducer;

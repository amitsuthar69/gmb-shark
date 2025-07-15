import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = { isLoading: boolean; userToken: string | null };
type AuthAction =
  | { type: "RESTORE_TOKEN"; token: string | null }
  | { type: "SIGN_IN"; token: string }
  | { type: "SIGN_OUT" };

const initialAuthState: AuthState = { isLoading: true, userToken: null };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "RESTORE_TOKEN": // restore_token to fetch the token from Local Storage before the page loads
      return { ...state, userToken: action.token, isLoading: false };
    case "SIGN_IN":
      return { ...state, userToken: action.token, isLoading: false };
    case "SIGN_OUT":
      return { ...state, userToken: null, isLoading: false };
    default:
      return state;
  }
}

export const AuthContext = createContext<{
  userToken: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({
  userToken: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const restoreToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      dispatch({ type: "RESTORE_TOKEN", token });
    };
    restoreToken();
  }, []);

  const authContext = useMemo(
    () => ({
      userToken: state.userToken,
      isLoading: state.isLoading,
      signIn: async (token: string) => {
        console.log("logging in with token: ", token);
        await AsyncStorage.setItem("userToken", token);
        dispatch({ type: "SIGN_IN", token });
      },
      signOut: async () => {
        console.log("signing out...");
        await AsyncStorage.removeItem("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    [state.userToken, state.isLoading]
  );

  if (state.isLoading) return null;

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

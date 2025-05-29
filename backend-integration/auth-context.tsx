// import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
// import { User, LoginInput, SignUpInput } from './types'
// import { login as apiLogin, signUp as apiSignUp } from './api'

// interface AuthContextType {
//   user: User | null
//   token: string | null
//   login: (input: LoginInput) => Promise<void>
//   signUp: (input: SignUpInput) => Promise<void>
//   logout: () => void
//   isLoading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [token, setToken] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token')
//     const storedUser = localStorage.getItem('user')
    
//     if (storedToken && storedUser) {
//       setToken(storedToken)
//       setUser(JSON.parse(storedUser))
//     }
    
//     setIsLoading(false)
//   }, [])

//   const login = async (input: LoginInput) => {
//     const response = await apiLogin(input)
//     setToken(response.token)
//     setUser(response.user)
//     localStorage.setItem('token', response.token)
//     localStorage.setItem('user', JSON.stringify(response.user))
//   }

//   const signUp = async (input: SignUpInput) => {
//     const response = await apiSignUp(input)
//     setToken(response.token)
//     setUser(response.user)
//     localStorage.setItem('token', response.token)
//     localStorage.setItem('user', JSON.stringify(response.user))
//   }

//   const logout = () => {
//     setToken(null)
//     setUser(null)
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//   }

//   return (
//     <AuthContext.Provider value={{ user, token, login, signUp, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// } 
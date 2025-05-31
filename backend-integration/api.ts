// import { AuthResponse, LoginInput, SignUpInput, DashboardStats } from './types'
// // import { LOGIN, SIGN_UP } from './graphql/mutations'
// // import { GET_DASHBOARD_STATS } from './graphql/queries'

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// export const login = async (input: LoginInput): Promise<AuthResponse> => {
//   const response = await fetch(`${API_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: LOGIN,
//       variables: { input },
//     }),
//   })

//   const data = await response.json()
//   if (data.errors) throw new Error(data.errors[0].message)
//   return data.data.login
// }

// export const signUp = async (input: SignUpInput): Promise<AuthResponse> => {
//   const response = await fetch(`${API_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       query: SIGN_UP,
//       variables: { input },
//     }),
//   })

//   const data = await response.json()
//   if (data.errors) throw new Error(data.errors[0].message)
//   return data.data.signUp
// }

// export const getDashboardStats = async (token: string): Promise<DashboardStats> => {
//   const response = await fetch(`${API_URL}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       query: GET_DASHBOARD_STATS,
//     }),
//   })

//   const data = await response.json()
//   if (data.errors) throw new Error(data.errors[0].message)
//   return data.data.dashboardStats
// }

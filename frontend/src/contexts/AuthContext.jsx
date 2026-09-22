import { useState } from 'react'

import {
  loginUser,
  registerUser,
} from '../services/authService'

import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const [token, setToken] = useState(
    () => sessionStorage.getItem('token')
  )

  async function login(email, password) {
    const data = await loginUser(
      email,
      password
    )

    sessionStorage.setItem(
      'token',
      data.token
    )

    setToken(data.token)
    setUser(data.user)

    return data
  }

  async function register(
    name,
    email,
    password
  ) {
    return registerUser(
      name,
      email,
      password
    )
  }

  function logout() {
    sessionStorage.removeItem('token')

    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
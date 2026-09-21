import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {
  findUserByEmail,
  createUser,
} from '../repositories/userRepository.js'

export async function registerUser(data) {
  const {
    name,
    email,
    password,
  } = data

  if (!name || !email || !password) {
    const error = new Error(
      'Nome, e-mail e senha são obrigatórios.'
    )

    error.statusCode = 400

    throw error
  }

  const normalizedName = name.trim()
  const normalizedEmail = email.trim().toLowerCase()

  if (normalizedName.length < 2) {
    const error = new Error(
      'O nome deve ter pelo menos 2 caracteres.'
    )

    error.statusCode = 400

    throw error
  }

  if (password.length < 6) {
    const error = new Error(
      'A senha deve ter pelo menos 6 caracteres.'
    )

    error.statusCode = 400

    throw error
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(normalizedEmail)) {
    const error = new Error(
      'Informe um e-mail válido.'
    )

    error.statusCode = 400

    throw error
  }

  const existingUser = await findUserByEmail(
    normalizedEmail
  )

  if (existingUser) {
    const error = new Error(
      'Este e-mail já está cadastrado.'
    )

    error.statusCode = 409

    throw error
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await createUser({
    name: normalizedName,
    email: normalizedEmail,
    passwordHash,
  })

  return user
}

export async function loginUser(data) {
  const {
    email,
    password,
  } = data

  if (!email || !password) {
    const error = new Error(
      'E-mail e senha são obrigatórios.'
    )

    error.statusCode = 400

    throw error
  }

  const normalizedEmail = email
    .trim()
    .toLowerCase()

  const user = await findUserByEmail(
    normalizedEmail
  )

  if (!user) {
    const error = new Error(
      'E-mail ou senha inválidos.'
    )

    error.statusCode = 401

    throw error
  }

  const passwordIsValid = await bcrypt.compare(
    password,
    user.password_hash
  )

  if (!passwordIsValid) {
    const error = new Error(
      'E-mail ou senha inválidos.'
    )

    error.statusCode = 401

    throw error
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || '1d',
    }
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  }
}
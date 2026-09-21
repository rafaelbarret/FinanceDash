import {
  registerUser,
  loginUser,
} from '../services/authService.js'

export async function register(request, response) {
  try {
    const user = await registerUser(request.body)

    return response.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user,
    })
  } catch (error) {
    console.error(
      'Erro ao cadastrar usuário:',
      error.message
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message:
        error.statusCode
          ? error.message
          : 'Erro interno do servidor.',
    })
  }
}

export async function login(request, response) {
  try {
    const result = await loginUser(request.body)

    return response.status(200).json({
      message: 'Login realizado com sucesso!',
      ...result,
    })
  } catch (error) {
    console.error(
      'Erro ao realizar login:',
      error.message
    )

    return response.status(
      error.statusCode || 500
    ).json({
      message:
        error.statusCode
          ? error.message
          : 'Erro interno do servidor.',
    })
  }
}
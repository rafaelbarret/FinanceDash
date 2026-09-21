import jwt from 'jsonwebtoken'

export function authenticateToken(request, response, next) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token de autenticação não informado.',
    })
  }

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({
      message: 'Formato do token inválido.',
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    request.user = decoded

    next()
  } catch (error) {
    return response.status(401).json({
      message: 'Token inválido ou expirado.',
    })
  }
}
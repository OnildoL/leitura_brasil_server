import jwt from "jsonwebtoken"
const { decode } = jwt

export async function addUserInformationToRequest(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Token inválido!", 401)
  }

  const [, token] = authorization?.split(" ");

  if (!token) {
    throw new AppError("Token inválido!", 401)
  }

  try {
    const decoded = decode(token);

    request.user_id = decoded.sub;

    return next();
  } catch {
    throw new AppError("Token inválido!", 401)
  }
}
import config from 'config';
import jwt from "jsonwebtoken";

const SECRET_KEY = config.get<string>("SECRET_KEY");

const generateToken = (id: string, email: string) => {
    return jwt.sign(
        {id, email},
        SECRET_KEY,
        {expiresIn: '24h'}
    )
}

function validateToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY)
    } catch (err) {
        return null;
    }
}

export { generateToken, validateToken }
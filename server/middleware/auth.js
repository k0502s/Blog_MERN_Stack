import jwt from 'jsonwebtoken';
import config from '../config/index.js'
const { JWT_SECRET } = config

const auth = (req, res, next) => {
    const token = req.header('x-auth-token') //토큰 키 값

    if(!token) {
        return res.status(401).json({msg: "토큰 없음. 인증 실패"})
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET) //jwt의 인증 처리
        req.user = decoded
        next()
    } catch(e) {
        console.log(e);
        res.status(400).json({msg: "토큰이 유효하지 않습니다"})
    }
}

export default auth;

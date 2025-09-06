import jwt from 'jsonwebtoken'

export const setToken = (payload : object | string) => {
    try{
        if(!payload) {
            return null;
        }
        return jwt.sign(payload, process.env.JWT_SECRET as string);
    }catch(err){
        throw new Error(`Jwt Error : ${err}`);
    }
}

export const getToken = (token : string) => {
    if(!token) {
        return null;
    }
    return jwt.verify(token, process.env.JWT_SECRET as string);
}
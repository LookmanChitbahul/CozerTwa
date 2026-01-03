import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days-should be in miliseconds
        httpOnly: true, //prevent XSS attacks: cross site scripting attacks
        sameSite:"strict", //CSRF attacks
        secure: process.env.NODE_ENV === "production" ? false : true, //only send cookie over https
    });

    return token;
}

import cookie from "cookie"

async function handlerSignOut(req, res) {
    res.status(200)
        .setHeader('Set-Cookie', cookie.serialize('jwt', '', {
            path: '/api',
            expires: new Date(0),
        }))
        .json({})
}
export default handlerSignOut
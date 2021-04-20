import {
    Router
} from 'express'
import {
    schema
} from '../../helper'
const authenticationRouter = Router()

authenticationRouter.post('/', function (req, res) {
    res.send(schema({
        token: "ab184f4bc31d51b58d5a1fcbebc25bc690f6c417"
    }))
})

export default authenticationRouter

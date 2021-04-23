import express from "express"
import {
    routes
} from "./routes"

const app = express()

const publicPaths = [
    '/api/authentication'
]
const isAuthorized = req => {
    return publicPaths.includes(req.url)
}

app.use((req, res, next) => {
    console.log(`mock: ${req.url}`)
    if (isAuthorized(req)) {
        setTimeout(() => next(), 3000)
    } else {
        res.sendStatus(401)
    }
})

routes.forEach(route => app.use(route.path, route.router))

app.listen(3000, () => {
    console.log('Mock Server is running...')
})

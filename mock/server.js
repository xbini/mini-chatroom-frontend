import express from "express"
import {
    routes
} from "./routes"

const app = express()

const isAuthorized = req => {
    return true
}

app.use((req, res, next) => {
    if (isAuthorized(req)) {
        next()
    } else {
        res.sendStatus(401)
    }
})

routes.forEach(route => app.use(route.path, route.router))

app.listen(3000, () => {
    console.log('Mock Server is running...')
})

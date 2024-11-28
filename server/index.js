import express from 'express'
import cors from 'cors'
import { adminRouter } from './Routes/AdminRoute.js'




const app = express()
app.use(cors({
origin : ["http://localhost:3000"],
methods: ['GET', 'POST', 'PUT'],
credentials: true

}))
app.use(express.json())
app.use('/auth', adminRouter)

app.listen(4000, () => {
    console.log("Server is running")
})
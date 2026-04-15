require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const authRoutes = require("./Routes/authRoutes")
const jobRoutes = require("./Routes/jobRoutes")
const applicationRoutes = require("./Routes/applicationRoutes")


app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/application", applicationRoutes)




mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected")
        app.listen(process.env.PORT, () => {
            console.log(`Server connected on PORT ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("DB Connection Failed")
        console.log(err)
    })

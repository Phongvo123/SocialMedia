const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require('body-parser')

dotenv.config()

const AuthRoute = require("./routes/AuthRoute")
const ChatRoute = require("./routes/ChatRoute")
const MessageRoute = require("./routes/MessageRoute")

const app = express()

app.use(bodyParser.json())
app.use(cors()) 

const PORT = process.env.PORT
const CONNECTION = process.env.MONGODB_CONNECTION

mongoose.connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, ()=> console.log(`Listening at Port ${PORT}`)))
.catch((error) => console.log(`${error} did not connect`));

app.use("/auth", AuthRoute)
app.use("/chat", ChatRoute)
app.use("/message", MessageRoute)
import express from "express"
import cors from "cors"
export const app = express()

app.use(cors({ origin: "http://localhost:5000/" }));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", (req, res) => {
  res.send({message: "Welcome HOme"})
})

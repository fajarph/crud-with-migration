const express = require("express")
const cors = require('cors')
const app = express()
const PORT = 5000

const routes = require("./routes")

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(routes)



app.listen(PORT, () => {
    console.log(`Server Menyala di PORT ` +PORT);
})
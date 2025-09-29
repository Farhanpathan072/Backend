import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({ path: "./.env" })   // ✅ check filename

const PORT = process.env.PORT || 8000

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port: ${PORT}`)
    })
})
.catch((error) => {
    console.error("❌ ERROR! Connection failed:", error)
})














//FIRst Approach for connection
/*const app = express()
( async () => {
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`) 
       app.on("error", (error) => {
        console.log("ERROR:", error)
        throw error
       } ) 

       app.listen(process.env.PORT, () => {`Server is listening on port ${process.env.PORT}`})
    } catch (error) {
        console.log(error);
        throw error
    }
} )()
*/    
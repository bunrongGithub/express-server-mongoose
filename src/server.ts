/** 
 *  App (api & middleware)
 */
import app from "./app"

/** 
 *  Connection to mongoose
 */
import {connection} from "./database/connection";


/**
 * GLOBAL ERROR HANDLER MIDDLEWARE
*/
import errorHandler from "./middleware/errorHandler";
app.use(errorHandler);
/** 
 *  Start Server with port 4000
 */

const startServer = async () => {
  try {
    await connection().then(() => {
      app.listen(process.env.PORT , () => {
        console.log(`server running at http://localhost:${process.env.PORT}`)
      })
    })
  } catch (error) {
    process.exit(1);
  }
}
startServer();


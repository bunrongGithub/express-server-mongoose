/** 
 *  App (api & middleware)
 */
import app from "./app"

/** 
 *  Connection to mongoose
 */
import {connection} from "./database/connection";

/** load config from .env */
import config from "./config";

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
      app.listen(config.port , () => {
        console.log(`server running at http://localhost:${config.port}`)
      })
    })
  } catch (error) {
    /** if the server crash it will close the connection */
    process.exit(1);
  }
}
startServer();


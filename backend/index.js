import { app } from "./app.js";
import { dataBaseConnection } from "./src/dataBase/db.js";

dataBaseConnection().then(() =>{
    app.listen(process.env.PORT || 6000,() =>{
        console.log(`port running at ${process.env.PORT}`);
        
    })
})

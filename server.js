const app = require('./app')
const dotenv = require('dotenv')
const connectDb = require('./config/db');
const cloudinary = require('cloudinary').v2;

// config
dotenv.config({path:'backend/config/config.env'});



// DB
connectDb();
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is Working..`)
})

cloudinary.config({
  cloud_name: "devnix",
  api_key: "612734565428423",
  api_secret: "onVrrcd8RACqD4SlXZ6awBjW1ms"
});

// unhandel Promise rejection
process.on('unhandledRejection',err=>{
    console.log(`Error ${err.message}`);
    console.log(`Shutting down the server due to Unhadel Promise rejection`);

    server.close(()=>{
        process.exit(1)
    })
})
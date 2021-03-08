import app from './app.js'
import config from './config/index.js'

const {PORT} = config

app.listen('5000', () => { 
    console.log(`Server started on Port ${PORT}`);
});

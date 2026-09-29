const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./dp/mongoose'); // Import the mongoose connection

const userRouter = require('./routers/user');

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(userRouter);
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

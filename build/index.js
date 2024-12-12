import app from './app.js';
import config from './utils/config.js';
import mongoose from 'mongoose';
async function startServer() {
    // For attempting connection to the database
    try {
        console.log('connecting to MongoDB...');
        await mongoose.connect(config.MONGODB_URL);
        console.log('Connected');
    }
    catch (error) {
        let errorMessage = 'Error connecting to database: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
    app.listen(config.PORT || 3000, () => {
        console.log('app listening on port ' + config.PORT);
    });
}
// Handle the promise returned by startServer
startServer().catch((error) => {
    console.error('Failed to start server:', error);
});

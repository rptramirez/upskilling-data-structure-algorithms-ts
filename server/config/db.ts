import mongoose from 'mongoose';

const connectDB = async () => {

    const mongoUriConnString: string = process.env.MONGO_URI
    try {
        mongoose.connect(mongoUriConnString, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error('Connection error: ', JSON.stringify(err.message))
    }
}
import mongoose from 'mongoose'

const connectDb = async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('MongoDB connected...'.red.bgWhite)
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

export default connectDb;
import { connect } from "mongoose"

const connectDatabase = () => {
    console.log("Connecting to the database...")
    connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log("MongoDB connected.")
    }
    ).catch((error) => {
        console.log(error)
    })
}

export default connectDatabase
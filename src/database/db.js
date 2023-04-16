import { connect } from "mongoose"
import chalk from 'chalk';

const connectDatabase = () => {

    console.log("//////////////////////////////////////")

    console.log("Connecting to the database...")
    connect("mongodb+srv://root:root@cluster0.ct8tftd.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log(chalk.bold.green("MongoDB connected."))

        console.log("//////////////////////////////////////")
    }
    ).catch((error) => {
        console.log(error)
        
        console.log("//////////////////////////////////////")
    })
}

export default connectDatabase
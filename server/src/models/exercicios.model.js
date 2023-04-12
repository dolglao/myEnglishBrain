import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    grupo: {
        type: String,
        required: true,
    },
    exercicio: {
        type: String,
        required: true,
    },
    series: {
        type: String,
        required: true,
    },
    repeticoes: {
        type: String,
        required: true,
    },
    intervalo: {
        type: Number,
        required: true,
    },
    obs: {
        type: String
    }
})

const exercicio = model("exercicio", userSchema)

export default exercicio
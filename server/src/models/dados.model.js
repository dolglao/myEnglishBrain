import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    data: {
        type: Number,
        required: true,
    },
    exercicio_id: {
        type: String,
        required: true,
    },
    repeticoes: {
        type: Number,
        required: true,
    },
    carga: {
        type: Number,
        required: true,
    },
    cargaTotal: {
        type: Number,
        required: true,
    },
    obs: {
        type: String
    }
})

const dados = model("dado", userSchema)

export default dados
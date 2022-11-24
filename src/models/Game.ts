import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
    player1: {
        name: { type: String, required: true },
        hands: { type: String, required: true }
    },
    player2: {
        name: { type: String, required: true },
        hands: { type: String, required: true }
    },
})

export default mongoose.model('player', GameSchema);
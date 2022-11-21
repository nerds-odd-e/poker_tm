import mongoose from 'mongoose'

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
})

export default mongoose.model('player', PlayerSchema);
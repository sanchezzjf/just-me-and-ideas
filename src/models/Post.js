import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        description: 'It will show on the side'
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('post', PostSchema)
const PostModel = mongoose.model('post')

export { PostModel }
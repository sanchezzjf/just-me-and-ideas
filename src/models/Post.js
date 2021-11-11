import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: Buffer,
        contentType: String,
    },
    description: {
        type: String,
        required: true,
        description: 'It will show on the side'
    },
    body: {
        type: String,
        required: true
    }
})

mongoose.model('post', PostSchema)
const PostModel = mongoose.model('post')

export { PostModel }
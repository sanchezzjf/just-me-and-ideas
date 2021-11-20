import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("comment", CommentSchema)
const CommentModel = mongoose.model('comment')

export { CommentModel } 
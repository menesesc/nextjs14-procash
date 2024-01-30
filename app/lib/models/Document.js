import { Schema, model, models } from "mongoose"

const documentSchema = new Schema({ 
    category: { type: String, required: true, trim: true},
    title: { type: String, trim: true},
    description: { type: String, trim: true},
    data: { type: String, trim: true},
    links: [{ type: String, trim: true}],
    images:  [{ type: String, trim: true}],
    votes: { type: Number},
    tags: [{ type: String, trim: true}]
}, {timestamps: true})

export default models.Document || model('Document', documentSchema, 'documents')

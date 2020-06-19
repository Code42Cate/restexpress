import mongoose, { Schema } from 'mongoose'
import { paginate, filter } from 's/mongoose'
import rules from './acl'
import userAcl from 'a/user/acl'

const messageSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            minlength: 2
        },
        author: {
            type: 'ObjectId',
            ref: 'User',
            required: false
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (obj, ret) => {
                delete ret._id
            }
        }
    }
)

messageSchema.plugin(filter, { rules })
messageSchema.plugin(paginate, { rules, populateRules: { author: userAcl } })

const model = mongoose.model('Message', messageSchema)

export const schema = model.schema
export default model

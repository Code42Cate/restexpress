import m2s from 'mongoose-to-swagger'
import shortid from 'shortid'
import mongoose, { Schema } from 'mongoose'
import { paginate, filter, ownership } from 's/mongoose'
import rules from './acl'
import userAcl from 'a/user/acl'

// Data schema for channel

const dataSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20
        },
        channelId: {
            type: String,
            maxlength: 25,
            unique: true,
            default: shortid.generate
        },
        description: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
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

dataSchema.plugin(filter, { rules, populateRules: { author: userAcl } })
dataSchema.plugin(paginate, { rules, populateRules: { author: userAcl } })
dataSchema.plugin(ownership)

const model = mongoose.model('Channel', dataSchema)
model.swaggerSchema = m2s(model)
export const schema = model.schema

export default model

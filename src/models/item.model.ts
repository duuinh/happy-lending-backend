import { model, Schema, Document } from "mongoose"
import { ItemStatusEnum } from "../constants"
import User from "./user.model"

export type ItemDocument = Document & {
    name: string,
    img_url: string,
    lender: string,
    status: string
}

const schema: Schema = new Schema({ 
    name: {
        type: String,
        required: true
    }, 
    img_url: {
        type: String,
        required: true
    },
    lender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: ItemStatusEnum.available,
    }
}, { timestamps: true, versionKey: false })

schema.path('lender').validate(async (value: string) => {
    return await User.findById(value);
  }, 'User does not exist');

const Item = model<ItemDocument>('Item', schema)

export default Item
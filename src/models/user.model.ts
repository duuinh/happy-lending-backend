import { model, Schema, Document } from "mongoose"
import Location from "./location.model";

export type UserDocument = Document & {
    name: string,
    email: string,
    phone_no: string,
    location: string,
}

const schema: Schema = new Schema({ 
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique : true
    },
    phone_no: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
}, { timestamps: true, versionKey: false })

schema.path('location').validate(async (value: string) => {
    return await Location.findById(value);
}, 'Location does not exist');

const User = model<UserDocument>('User', schema)

export default User
import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName:  String,
  lastName: String,
  email: String,
  birthDate:   String,
  password: String,
});

const UserModel = mongoose.model('User', UserSchema);

export {
    UserModel,
    UserSchema,
};
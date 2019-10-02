



import mongoose, { Schema } from 'mongoose';

const userInfoSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  // ...other fields
});

const myDB = mongoose.connection.useDb('myDB');

const UserInfo = myDB.model('userInfo', userInfoSchema);

export default UserInfo;
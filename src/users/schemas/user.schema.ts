import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

UserSchema.method('toClient', function () {
  const object = this.toObject();
  object.id = object._id;
  delete object._id;
  return object;
});

UserSchema.pre('save', function (next) {
  /* eslint-disable @typescript-eslint/no-this-alias */
  const user: any = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR, 10), (error, salt) => {
    if (error) return next(error);
    return bcrypt.hash(user.password, salt, (bcryptError, hash) => {
      if (bcryptError) return next(bcryptError);
      user.password = hash;
      return next();
    });
  });
});

export { UserSchema };

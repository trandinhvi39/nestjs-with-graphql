import * as mongoose from 'mongoose';

const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

CatSchema.method('toClient', function () {
  const object = this.toObject();
  object.id = object._id;
  delete object._id;
  return object;
});

export { CatSchema };

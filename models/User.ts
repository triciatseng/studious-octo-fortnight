import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const SALT_ROUNDS = (process.env.NODE_ENV === "test") ? 1:10;

export interface IUserModel extends app.i.IUser, mongoose.Document{
  hashPassword(password: string, cb: (err,hash: string) => any);
  generateJWT(): string;
  comparePassword(password: string, cb: (err, isMatch: boolean) => any);
}

let userSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  imageURL: { type: String },

  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wish'}]
});

userSchema.method('hasPassword',function(password, done) {
  bcrypt.genSalt(SALT_ROUNDS, (err,salt) => {
    if(err) return done(err);
    bcrypt.hash(password,salt,(err,hash) => {
      if(err) return done(err);
      done(null, hash);
    });
  });
});

userSchema.method('comparePassword',function(password,done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if(err) return done(err);
  });
});

userSchema.method('generateJWT', function() {
  return jwt.sign({
    email: this.email,
    name: this.name,
    _id: this._id
  }, process.env.JWT_SECRET);
});

export let User = mongoose.model<IUserModel>('User', userSchema);

import * as mongoose from 'mongoose';

export interface IWishModel extends app.i.IWish, mongoose.Document {}

let wishSchema = new mongoose.Schema({
  itemName: { type: String, require: true },
  itemPrice: { type: Number, default: -1 },
  itemDesc: { type: String, require: true },
  dateAdd: { type: Number },
  itemURL: { type : String, required: true },
  itemImg: { type: String, default: 'http://www.shoppingbags.com/store/images/D/Gage_PaperEuro_ManhattanBag_NaturalKraft.jpg' }
});

export let Wish = mongoose.model<IWishModel>('Wish',wishSchema);

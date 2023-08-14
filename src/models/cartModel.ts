import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

const cartItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

export default mongoose.model<ICartItem>('CartItem', cartItemSchema);

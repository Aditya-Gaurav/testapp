import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}

const orderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
});

export default mongoose.model<IOrder>('Order', orderSchema);

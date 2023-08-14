import mongoose, { Schema, Document } from 'mongoose';

export interface IProductVariant extends Document {
  product: Schema.Types.ObjectId;
  color: string,
  size: string,
  quantityAvailable: number,
  cartQuantity: number,
  imageUrls: [string],
  videoUrls: [string],
  price: number, 
  currency: string, 
  }

const productVariantSchema: Schema = new Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  cartQuantity: { type: Number, default: 0 },
  imageUrls: [{ type: String }],
  videoUrls: [{ type: String }],
  price: { type: Number, required: true }, // Price in the local currency of the variant
  currency: { type: String, required: true }, // Currency code (e.g., "INR" for Indian Rupees, "USD" for US Dollars)
});

export default mongoose.model<IProductVariant>('IProductVariant', productVariantSchema);

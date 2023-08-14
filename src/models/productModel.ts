import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  defaultCurrency:string;
  category: Schema.Types.ObjectId;
  isActive: boolean;
  defaultImageUrl: string;
  defaultVideoUrl: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;

}

const productSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }, // Default price in the default currency
    defaultCurrency: { type: String, required: true }, // Default currency code
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    isActive: { type: Boolean, default: true },
    defaultImageUrl: { type: String },
    defaultVideoUrl: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    slug: { type: String },
});

export default mongoose.model<IProduct>('Product', productSchema);

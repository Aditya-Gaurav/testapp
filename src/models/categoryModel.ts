import mongoose, { Schema, Document } from 'mongoose';

  export interface ICategory extends Document {
  name: string;
  description?: string;
  parentCategory?: Schema.Types.ObjectId;
  subcategories?: Schema.Types.ObjectId[];
  image?: string;
  isActive?: boolean;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String },
  parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  image: { type: String },
  isActive: { type: Boolean, default: true },
});


export default mongoose.model<ICategory>('Category', categorySchema);

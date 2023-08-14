import { Request, Response } from 'express';
import CategoryModel, { ICategory } from '../models/categoryModel';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory: ICategory = new CategoryModel(req.body);
    const savedCategory: ICategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the category' });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories: ICategory[] = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category: ICategory | null = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the category' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory: ICategory | null = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the category' });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory: ICategory | null = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the category' });
  }
};

// Call the function to fetch the nested result
export const fetchCategoriesWithSubcategory = async (req: Request, res: Response) => {
  fetchCategoriesWithSubcategories().then(result => {
    console.log(JSON.stringify(result, null, 2));
    res.json(result);

  }).catch(err => {
    res.status(500).json({ error: 'Failed to delete the category' });
  });
}


 // Assuming you have the necessary setup for the MongoDB connection

 async function getSubcategories(categoryId: any, allCategories: ICategory[]): Promise<ICategory[]> {
  const subcategories = allCategories.filter(category => String(category.parentCategory) === String(categoryId));
  const result: any[] = [];
  for (const subcategory of subcategories) {
    const { _id, name, description } = subcategory;
    const nestedSubcategories = await getSubcategories(_id, allCategories);
    result.push({ _id, name, description, subcategories: nestedSubcategories });
  }
  return result;
}

async function fetchCategoriesWithSubcategories(): Promise<ICategory[]> {
  try {
    const allCategories = await CategoryModel.find();
    const topLevelCategories = allCategories.filter( (category:any) => !category.parentCategory);
    const result: any[] = [];
    for (const category of topLevelCategories) {
      const { _id, name, description } = category;
      const subcategories = await getSubcategories(_id, allCategories);
      result.push({ _id, name, description, subcategories });
    }
    return result;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  } finally {
  }
}


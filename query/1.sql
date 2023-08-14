db.categories.aggregate([
  {
    $match: { parentCategory: null } // Match the top-level categories (parentCategory is null)
  },
  {
    $lookup: {
      from: 'categories', // Target the same collection 'categories' for the subcategories lookup
      localField: '_id',
      foreignField: 'parentCategory',
      as: 'subcategories'
    }
  },
  {
    $project: {
      name: 1,
      description: 1,
      subcategories: {
        _id: 1,
        name: 1,
        description: 1
      }
    }
  }
]);

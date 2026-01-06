/**
 * Category Controller
 * 
 * Handles operations for post categories.
 */

const Category = require('../models/Category');

/**
 * Get all categories
 * GET /api/categories
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json({
      success: true,
      data: { categories },
      count: categories.length
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories.'
    });
  }
};

/**
 * Get a single category by ID
 * GET /api/categories/:id
 */
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    res.json({
      success: true,
      data: { category }
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category.'
    });
  }
};

/**
 * Create a new category (Admin only)
 * POST /api/categories
 */
const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    if (!category_name || !category_name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required.'
      });
    }

    const categoryId = await Category.create(category_name.trim());
    const newCategory = await Category.findById(categoryId);

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: { category: newCategory }
    });
  } catch (error) {
    // Handle duplicate category name
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Category name already exists.'
      });
    }

    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating category.'
    });
  }
};

/**
 * Update a category (Admin only)
 * PUT /api/categories/:id
 */
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { category_name } = req.body;

    if (!category_name || !category_name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required.'
      });
    }

    const updated = await Category.update(categoryId, category_name.trim());

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    const updatedCategory = await Category.findById(categoryId);

    res.json({
      success: true,
      message: 'Category updated successfully.',
      data: { category: updatedCategory }
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Category name already exists.'
      });
    }

    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating category.'
    });
  }
};

/**
 * Delete a category (Admin only)
 * DELETE /api/categories/:id
 */
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deleted = await Category.delete(categoryId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Category not found.'
      });
    }

    res.json({
      success: true,
      message: 'Category deleted successfully.'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category.'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};


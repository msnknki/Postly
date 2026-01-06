/**
 * Category Model
 * 
 * Handles all database operations related to post categories.
 */

const { pool } = require('../config/database');

class Category {
  /**
   * Get all categories
   */
  static async findAll() {
    const [rows] = await pool.execute(
      'SELECT category_id as id, category_name as category FROM categories ORDER BY category_name ASC'
    );
    return rows;
  }

  /**
   * Get a single category by ID
   */
  static async findById(categoryId) {
    const [rows] = await pool.execute(
      'SELECT * FROM categories WHERE category_id = ?',
      [categoryId]
    );
    return rows[0] || null;
  }

  /**
   * Create a new category (admin only)
   */
  static async create(categoryName) {
    const [result] = await pool.execute(
      'INSERT INTO categories (category_name) VALUES (?)',
      [categoryName]
    );
    return result.insertId;
  }

  /**
   * Update a category (admin only)
   */
  static async update(categoryId, categoryName) {
    const [result] = await pool.execute(
      'UPDATE categories SET category_name = ? WHERE category_id = ?',
      [categoryName, categoryId]
    );
    return result.affectedRows > 0;
  }

  /**
   * Delete a category (admin only)
   */
  static async delete(categoryId) {
    const [result] = await pool.execute(
      'DELETE FROM categories WHERE category_id = ?',
      [categoryId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Category;


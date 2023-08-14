import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/userController';

const router = express.Router();

// POST /api/users - Create a new user
router.post('/', createUser);

// GET /api/users - Get all users
router.get('/', getAllUsers);

// GET /api/users/:id - Get a specific user by ID
router.get('/:id', getUserById);

// PUT /api/users/:id - Update a user by ID
router.put('/:id', updateUserById);

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', deleteUserById);

export default router;

import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user: IUser = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a specific user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndDelete(
      req.params.id
    );
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

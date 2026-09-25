import { randomUUID } from "node:crypto";
import pool from "../config/db.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT id, name, email, phone, address, age, created_at
       FROM users
       WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, phone, address, age } = req.body;

    if (!name || !email || !phone || !address || age === undefined) {
      return res.status(400).json({
        message: "Name, email, phone, address and age are required",
      });
    }

    if (isNaN(age) || age < 0) {
      return res.status(400).json({
        message: "Age must be a valid number 0 or greater",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const result = await pool.query(
      `INSERT INTO users (name, email, phone, address, age)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [name, email, phone, address, age],
    );

    res.status(201).json({
      message: "Profile created successfully",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Failed to create profile:", error.message);

    res.status(500).json({
      message: "Failed to create profile",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, age } = req.body;

    if (!name || !email || !phone || !address || age === undefined) {
      return res.status(400).json({
        message: "Name, email, phone, address and age are required",
      });
    }

    if (isNaN(age) || age < 0) {
      return res.status(400).json({
        message: "Age must be a valid number 0 or greater",
      });
    }

    const emailCheck = await pool.query(
      "SELECT id FROM users WHERE email = $1 AND id != $2",
      [email, id],
    );

    if (emailCheck.rows.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const result = await pool.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           phone = $3,
           address = $4,
           age = $5
       WHERE id = $6
       RETURNING id, name, email, phone, address, age, created_at`,
      [name, email, phone, address, age, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Failed to update profile:", error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

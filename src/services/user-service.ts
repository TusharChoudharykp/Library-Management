import pool from "../config/config";
import bcrypt from "bcrypt";

class UserService {
  // Create a new user
  async createUser(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const [result] = await pool.execute(
      "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
      [data.name, data.email, hashedPassword]
    );
    return { id: (result as any).insertId, ...data, password: undefined };
  }

  // Find user by email
  async findUserByEmail(email: string) {
    const [rows]: any = await pool.execute(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    return rows[0];
  }
}

export default UserService;

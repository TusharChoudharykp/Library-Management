import pool from "../config/config";

class BookService {
  async create(data: { title: string; author: string; publishedYear: number }) {
    const [result]: any = await pool.execute(
      "INSERT INTO Books (title, author, publishedYear) VALUES (?, ?, ?)",
      [data.title, data.author, data.publishedYear]
    );

    const insertedId = result.insertId;

    const [rows]: any = await pool.execute("SELECT * FROM Books WHERE id = ?", [
      insertedId,
    ]);

    return rows[0]; // return the inserted book object
  }

  async get(id: number) {
    const [rows]: any = await pool.execute("SELECT * FROM Books WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  async getAll() {
    const [rows]: any = await pool.execute("SELECT * FROM Books");
    return rows;
  }

  async update(id: number, data: any) {
    await pool.execute(
      "UPDATE Books SET title = ?, author = ?, publishedYear = ? WHERE id = ?",
      [data.title, data.author, data.publishedYear, id]
    );

    const [rows]: any = await pool.execute("SELECT * FROM Books WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  async delete(id: number) {
    const [rows]: any = await pool.execute("SELECT * FROM Books WHERE id = ?", [
      id,
    ]);
    await pool.execute("DELETE FROM Books WHERE id = ?", [id]);
    return rows[0];
  }
}

export default BookService;

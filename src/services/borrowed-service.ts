import pool from "../config/config";
import { ResultSetHeader, RowDataPacket } from "mysql2";

class BorrowedService {
  async borrowBook(data: any) {
    const { userId, bookId, borrowDate, returnDate } = data;

    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO BorrowedBooks (userId, bookId, borrowDate, returnDate) VALUES (?, ?, ?, ?)",
      [userId, bookId, borrowDate, returnDate]
    );

    const insertId = result.insertId;

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT
             bb.id,
             u.id AS userId,
             u.name AS userName,
             b.id AS bookId,
             b.title AS bookTitle,
             bb.borrowDate,
             bb.returnDate
           FROM BorrowedBooks bb
           JOIN Users u ON bb.userId = u.id
           JOIN Books b ON bb.bookId = b.id
           WHERE bb.id = ?`,
      [insertId]
    );

    const formatDate = (dateStr: string) =>
      new Date(dateStr).toISOString().split("T")[0];

    return {
      ...rows[0],
      borrowDate: formatDate(rows[0].borrowDate),
      returnDate: formatDate(rows[0].returnDate),
    };
  }

  async returnBook(id: number, actualReturnDate: string) {
    const [borrowedRows]: any = await pool.execute(
      "SELECT returnDate FROM BorrowedBooks WHERE id = ?",
      [id]
    );

    if (borrowedRows.length === 0) return null;

    const dueDate = new Date(borrowedRows[0].returnDate);
    const actualDate = new Date(actualReturnDate);
    const diffDays = Math.ceil(
      (actualDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
    );
    const fine = diffDays > 0 ? diffDays * 30 : 0;

    await pool.execute(
      "UPDATE BorrowedBooks SET actualReturnDate = ?, fine = ? WHERE id = ?",
      [actualReturnDate, fine, id]
    );

    return { actualReturnDate, fine };
  }
}

export default BorrowedService;

import db from "../config/config";

export const createBook = async (
  title: string,
  author: string,
  publishedYear: number
) => {
  const [result] = await db.execute(
    "INSERT INTO books (title, author, published_year) VALUES (?, ?, ?)",
    [title, author, publishedYear]
  );
  return result;
};

export const getAllBooks = async () => {
  const [rows] = await db.execute("SELECT * FROM books");
  return rows;
};

export const getBookById = async (id: number) => {
  const [rows] = await db.execute("SELECT * FROM books WHERE id = ?", [id]);
  return rows;
};

export const updateBook = async (
  id: number,
  title: string,
  author: string,
  publishedYear: number
) => {
  const [result] = await db.execute(
    "UPDATE books SET title = ?, author = ?, published_year = ? WHERE id = ?",
    [title, author, publishedYear, id]
  );
  return result;
};

export const deleteBook = async (id: number) => {
  const [result] = await db.execute("DELETE FROM books WHERE id = ?", [id]);
  return result;
};

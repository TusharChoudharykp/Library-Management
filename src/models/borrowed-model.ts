export interface BorrowedBook {
  id?: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  dueDate: Date;
  actualReturnDate?: Date;
  fine?: number;
}

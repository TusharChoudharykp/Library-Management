export interface BorrowedBook {
  //borrow book model
  id?: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  dueDate: Date;
  actualReturnDate?: Date;
  fine?: number;
}

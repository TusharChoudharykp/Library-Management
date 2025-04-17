// export class AppError extends Error {
//   statusCode: number;
//   explanation: string;

//   constructor(message: string, statusCode: number) {
//     super(message);
//     this.statusCode = statusCode;
//     this.explanation = message;
//     Object.setPrototypeOf(this, new.target.prototype); // TS best practice
//   }
// }

export class AppError extends Error {
  public statusCode: number;
  public explanation: string[];

  constructor(explanation: string[], statusCode: number) {
    super(explanation[0]);
    this.statusCode = statusCode;
    this.explanation = explanation;
  }
}

import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/user-service";
import { successResponse } from "../utils/common/success-response";
import { errorResponse } from "../utils/common/error-response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = new UserService();

// User signup
const signup = async (req: any, res: any) => {
  try {
    const user = await userService.createUser(req.body);

    successResponse.message = "User registered successfully";
    successResponse.data = user;

    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error: any) {
    errorResponse.error = error;

    return res.status(error.statusCode).json(errorResponse);
  }
};

// User login
const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      errorResponse.message = "Invalid email or password";
      return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errorResponse.message = "Invalid email or password";
      return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse);
    }

    const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
      expiresIn: "1d",
    });

    successResponse.message = "Login successful";
    successResponse.data = { token };

    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error: any) {
    errorResponse.error = error;

    return res.status(error.statusCode).json(errorResponse);
  }
};

export { signup, login };

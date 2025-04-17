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
    return res.status(StatusCodes.CREATED).json({
      ...successResponse,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: error.message,
    });
  }
};

// User login
const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        ...errorResponse,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        ...errorResponse,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
      expiresIn: "1d",
    });

    return res.status(StatusCodes.OK).json({
      ...successResponse,
      message: "Login successful",
      data: { token },
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...errorResponse,
      message: error.message,
    });
  }
};

export { signup, login };

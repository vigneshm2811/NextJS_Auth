import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    console.error("Error verifying token:", error.message);
    throw new Error("Invalid token or user not authenticated");
  }
};

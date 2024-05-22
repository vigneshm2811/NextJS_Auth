import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    //check user already exists

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already Exists" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "Usert created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}

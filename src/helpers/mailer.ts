import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hash Token
    const hasedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hasedToken,
          verifyTokenExpire: Date.now() + 3600000,
        }
        //   { new: true, runValidators: true }
      );
    } else {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordTokenExpire: Date.now() + 3600000,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.PASSWORDEMAIL,
      },
    });
    const mailOptions = {
      from: '"Monster 👻" <vigneshmohan6383@gmail.com>', // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your password", // Subject line

      html: `<p>Click ${
        emailType === "VERIFY"
          ? `<a href="${process.env.domain}/verifyemail?token=${hasedToken}">here</a>`
          : `<a href="${process.env.domain}/newpassword?token=${hasedToken}">here</a>`
      }  to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`, // html body
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

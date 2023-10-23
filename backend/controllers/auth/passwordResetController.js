import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerifyResetToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";
const domainUrl = process.env.DOMAIN;
const { randomBytes } = await import("crypto");

export const resetPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("You must provide the email address");
  }

  const existingUser = await User.findOne({ email }).select("-passwordConfirm");

  if (!existingUser) {
    res.status(400);
    throw new Error(`${email} is not associated with any account`);
  }

  const verificationToken = await VerifyResetToken.findOne({
    _userId: existingUser._id,
  });

  if (verificationToken) {
    await verificationToken.deleteOne();
  }

  const resetToken = randomBytes(32).toString("hex");
  let newVerificationToken = await new VerifyResetToken({
    _userId: existingUser._id,
    token: resetToken,
    createdAt: Date.now(),
  }).save();

  if (existingUser && existingUser.isEmailVerified) {
    const emailLink = `${domainUrl}/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser._id}`;

    const payload = {
      name: existingUser.firstName,
      link: emailLink,
    };

    await sendEmail(
      existingUser.email,
      "Password Reset Request",
      payload,
      "./emails/template/requestResetPassword.handlebars"
    );

    res.status(200).json({
      success: true,
      message: `Hey ${existingUser.firstName}, an email has been sent to your account with the password reset link`,
    });
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password, passwordConfirm, emailToken, userId } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("A password is required");
  }

  if (!passwordConfirm) {
    res.status(400);
    throw new Error("A confirm password is required");
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  const passwordResetToken = await VerifyResetToken.findOne({
    _userId: userId,
  });

  if (!passwordResetToken || passwordResetToken.token !== emailToken) {
    res.status(400);
    throw new Error(
      "Your token either expired or invalid. Try resetting your password again"
    );
  }

  const user = await User.findById({
    _id: passwordResetToken._userId,
  }).select("-passwordConfirm");

  if (user && passwordResetToken) {
    user.password = password;
    await user.save();

    const payload = {
      name: user.firstName,
    };

    await sendEmail(
      user.email,
      "Password Reset Success",
      payload,
      "./emails/template/resetPassword.handlebars"
    );

    res.json({
      success: true,
      message: `Hey ${user.firstName}, your password reset was successful. An email has been sent to your account to confirm the same`,
    });
  }
});

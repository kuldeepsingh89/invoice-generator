import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import VerifyResetToken from "../../models/verifyResetTokenModel.js";
import sendEmail from "../../utils/sendEmail.js";

const domainUrl = process.env.DOMAIN;
const { randomBytes } = await import("crypto");

export const resendVerifyEmailToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!email) {
    res.send(400);
    throw new Error("An email must be provided");
  }

  if (!user) {
    res.send(400);
    throw new Error(
      `We were unable to find a user with given email: ${email} address`
    );
  }

  if (user.isEmailVerified) {
    res.send(400);
    throw new Error(`This account has already been verified. Please login`);
  }

  let verifyResetToken = await VerifyResetToken.findOne({
    _userId: user._id,
  });

  if (verifyResetToken) {
    await VerifyResetToken.deleteOne();
  }

  const resentToken = randomBytes(32).toString("hex");

  let emailToken = await new VerifyResetToken({
    _userId: user.id,
    token: resentToken,
  }).save();

  const emailLink = `${domainUrl}/api/v1/auth/verify/${emailToken.token}/${user._id}`;

  const payload = {
    name: user.firstName,
    link: emailLink,
  };

  await sendEmail(
    user.email,
    "Account verification",
    payload,
    "./emails/template/accountVerification.handlebars"
  );

  res.json({
    success: true,
    message: `${user.firstName}, an email has been sent to your account, please verify within 15 minutes`,
  });
});

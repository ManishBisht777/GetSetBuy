// create token and save to cookie

const sendtoken = (user, statusCode, res) => {
  const token = user.getJWTtoken();

  //optionss
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
    credentials: "include",
    sameSite: "None",
    secure: "true",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendtoken;

// create token and save to cookie

const sendtoken = (user, statusCode, res) => {
  const token = user.getJWTtoken();

  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
  //optionss
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpsOnly: true,
    SameSite: "None",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendtoken;

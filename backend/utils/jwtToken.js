// Create and send token and save in the cookie
const sendToken = (user, statuCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statuCode).cookie("token", token, options).json({
    sucess: true,
    token,
    user,
  });
};

module.exports = sendToken;

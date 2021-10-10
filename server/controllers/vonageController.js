require("dotenv").config();

let OpenTok = require('opentok');
let opentok = new OpenTok(process.env.API_KEY, process.env.SECRET);

exports.getSessionToken = async (req, res) => {
  const token = opentok.generateToken(req.params.sessionId)
  console.log(token);
  res.send(token)
}
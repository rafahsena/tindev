const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {

    console.log(req.io, req.connectedUsers);

    const { devId } = req.params;
    const { user } = req.headers;
    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if(!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    if(targetDev.likes.includes(loggedDev.id)) {
      const loggedSocket = req.connectedUsers[loggedUser];
      const targetSocket = req.connectedUsers[targetUser];
      if(loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }
      if(targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(targetDev.id);
    await loggedDev.save();

    return res.json(loggedDev);
  }
}
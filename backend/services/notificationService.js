const Notification = require('../models/Notification');

exports.createAndNotify = async ({ user_id, message, type, io }) => {
  const notif = await Notification.create({ user_id, message, type });
  if (io) io.emit('notification', notif);
  return notif;
};
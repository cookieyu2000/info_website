const path = require('path');
const express = require('express');

module.exports = function (app) {
  const adminDir = path.join(__dirname, '../public/admin');

  app.use('/admin', express.static(adminDir));
  app.get('/admin', (req, res) => {
    res.sendFile(path.join(adminDir, 'index.html'));
  });
};

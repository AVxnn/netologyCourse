module.exports = (req, res) => {
  res.status(404);
  const content = '404 | страница не найдена';
  res.send(content);
};
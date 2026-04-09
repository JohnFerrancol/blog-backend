const createLocals = (req, res, next) => {
  res.locals.links = [
    { href: '/', text: 'Home' },
    { href: '/api', text: 'API' },
  ];

  next();
};

export default createLocals;

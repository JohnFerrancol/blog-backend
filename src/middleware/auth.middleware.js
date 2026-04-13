import passport from '../config/passport.js';

const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Admins only',
    });
  }

  next();
};

export { requireAuth, requireAdmin };

import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getUserByName, getUserById } from '../services/auth.services.js';
import 'dotenv/config';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Finding the username from the database
      const user = await getUserByName(username);

      // If no matching user, throw error
      if (!user) {
        return done(null, false, { message: 'Username not found' });
      }

      // If password does not match, throw error
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await getUserById(payload.userId);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;

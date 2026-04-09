import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByName } from '../services/auth.services.js';

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

export default passport;

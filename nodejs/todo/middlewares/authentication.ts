import dotenv from 'dotenv';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import path from 'path';

dotenv.config({ path: path.join(__dirname,'../../../todo/config.env') });
console.log(__dirname);

passport.use(new BasicStrategy(
  (username, password, done) => {
    const validUsername = process.env.BASIC_AUTH_USERNAME;
    const validPassword = process.env.BASIC_AUTH_PASSWORD;
    //const validUsername = "adm";
    //const validPassword = "psw";

    if (username !== validUsername || password !== validPassword) {
      return done(null, false);
    }

    
    return done(null, { username });
  }
));

export default passport;
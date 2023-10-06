const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userService = require("./services/user.service");
const settingsService = require("./services/settings.service");
const { defaultUserSettings } = require("./controllers/default.app.settings");
const UserDto = require("./dto/user.dto");
const SettingsDto = require("./dto/settings.dto");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REACT_APP_GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, callback) => {
      try {
        const defaultUser = {
          email: profile.emails[0].value,
          googleId: profile.id,
          login: profile.displayName,
        };
        let user = await userService.findUser(profile.emails[0].value);
        let userSettings = "";
        if (user) {
          userSettings = await settingsService.getUserSettings(user.id);
        } else {
          user = await userService.createUser(defaultUser, "W;lfwen864320fjg4");
          userSettings = await settingsService.createUserSettings({
            ...defaultUserSettings,
            userId: user.id,
          });
        }
        user = new UserDto(user, new SettingsDto(userSettings));
        return callback(null, user);
      } catch (error) {
        console.error(error);
        callback(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

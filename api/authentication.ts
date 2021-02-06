import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth2'

const GOOGLE_OAUTH_CLIENT_ID = '550291530150-51o51t1k1o57ru2slf911qg9vcikvg06.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = ''
const TWITTER_CLIENT_ID = ''
const TWITTER_CLIENT_SECRET = ''
const TWITCH_CLIENT_ID = ''
const TWITCH_CLIENT_SECRET = ''
const FACEBOOK_CLIENT_ID = ''
const FACEBOOK_CLIENT_SECRET = ''
const GITHUB_CLIENT_ID = ''
const GITHUB_CLIENT_SECRET = ''

const init = (): void => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      (_accessToken, _refreshToken, profile, done) => {
        return done(null, profile)
      },
    ),
  )

  // passport.use(
  //   new TwitterStrategy.Strategy(
  //     {
  //       clientID: TWITTER_CLIENT_ID,
  //       clientSecret: TWITTER_CLIENT_SECRET,
  //       callbackURL: '/api/auth/twitter/callback',
  //     },
  //     (_accessToken, _refreshToken, profile, done) => {
  //       return done(null, profile)
  //     },
  //   ),
  // )

  // passport.use(
  //   new FacebookStrategy.Strategy(
  //     {
  //       clientID: FACEBOOK_CLIENT_ID,
  //       clientSecret: FACEBOOK_CLIENT_SECRET,
  //       callbackURL: '/api/auth/facebook/callback',
  //     },
  //     (_accessToken, _refreshToken, profile, done) => {
  //       return done(null, profile)
  //     },
  //   ),
  // )

  // passport.use(
  //   new TwitchStrategy.Strategy(
  //     {
  //       clientID: TWITCH_CLIENT_ID,
  //       clientSecret: TWITCH_CLIENT_SECRET,
  //       callbackURL: '/api/auth/twitch/callback',
  //     },
  //     (_accessToken, _refreshToken, profile, done) => {
  //       return done(null, profile)
  //     },
  //   ),
  // )

  // passport.use(
  //   new GithubStrategy.Strategy(
  //     {
  //       clientID: GITHUB_CLIENT_ID,
  //       clientSecret: GITHUB_CLIENT_SECRET,
  //       callbackURL: '/api/auth/github/callback',
  //     },
  //     (_accessToken, _refreshToken, profile, done) => {
  //       return done(null, profile)
  //     },
  //   ),
  // )
}

export default init

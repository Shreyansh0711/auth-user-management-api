import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { user as User} from "./models/user.model.js";

passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.GOOGLE_CALLBACK_URL,
    },
    //called after authentication
    //below is heart of OAuth
    async(accesstoken,refreshtoken,profile,done)=>{
        try {
            const email=profile.emails[0].value
            const fullname=profile.displayName
            const avatar=profile.photos[0].value
            const googleId=profile.id;
            let user=await User.findOne({email})
            const username=fullname.replace(/\s+/g,"").toLowerCase()+
            Math.floor(Math.random()*1000)
            if(!user){
                user=await User.create({
                    fullname,
                    email,
                    username,
                    avatar,
                    googleId,
                    isEmailVerified:true,
                })
            }
            if(user&&!user.googleId){
                user.googleId=googleId;
                await user.save({validateBeforeSave:false})
            }
            
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
)
)

export default passport
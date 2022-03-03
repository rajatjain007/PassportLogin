const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initialize(passport,getUserByEmail,getUserByID){
    const authenticateUser = async (email,password,done) =>{
        const user = getUserByEmail(email)
        if(user==null){
            return done(null,false,{messages:"No user with that email."})
        }
        try{
            if (await bcrypt.compare(password,user.password)){
                return done(null,true)
            }
            else{
                return done(null,false,{messages:"Incorrect password"})
            }
        }
        catch(e){
           return done(e) 
        }

    }
    passport.use(new localStrategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done)=>done(null,user.id))
    passport.deserializeUser((id,done) => done(null,getUserByID(id)))
}

module.exports = initialize
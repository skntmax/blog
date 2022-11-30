import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import dotenv  from 'dotenv'
import Token from '../models/tokens.js'

dotenv.config();
export const signupUser = async ( req, res)=>{
    try{
        const something = await bcrypt.genSalt(7);
        const haspass = await bcrypt.hash(req.body.password,something)
        const user = {username:req.body.username, name:req.body.name,password:haspass}
        const newUser = new User(user);
        await newUser.save();
        return res.status(200).json({msg:"Signup succesfull"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Error while signup User",err})
    }
}

export const loginUser = async ( req, res)=>{
    let userexist = await User.findOne({username:req.body.username});
    if(!userexist){
        return res.status(400).json({msg:'username does not exist, please check once or create new account'})
        }
    try{
        let usermatched = await bcrypt.compare(req.body.password, userexist.password);
        if(usermatched){
            const accessToken = jwt.sign(userexist.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'})
            const refreshToken = jwt.sign(userexist.toJSON(),process.env.REFRESH_SECRET_KEY)
            const newToken = new Token({ token: refreshToken })
            await newToken.save();
            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:userexist.name,username:userexist.username})
        } else{
            res.status(400).json({msg:'password does not match'})
        }
    }catch(err){
        return res.status(500).json({msg:'Error while login user'})
    }
}
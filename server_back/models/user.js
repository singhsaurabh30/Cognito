import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["instructor","student"],
        default:"student"
    },
    photoUrl:{
        type:String,
        default:""
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ]
},{timestamps:true});

userSchema.pre('save',
    async function(next){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password=hash;
        next();
    }
)

const User=mongoose.model('User',userSchema);


export {User};
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true

    },
    userName: {
        type: String,
        required: [true, 'field is required'],
        unique:true
    },
    location: {
        type: String,
        required: [true, 'field is required']

    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },


}, { timestamps: true })


// userSchema.method.matchPassword=async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword,this.password)
    
// }

// userSchema.pre('save' async function (next){
//     if(!this.isModified('password')){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await  bcrypt.hash(this.password,salt)
// })

module.exports = mongoose.model("User", userSchema)
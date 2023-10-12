import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName',
    },
    location: {
        type: String,
        default: 'my city',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
});

/* Mongoose Methods */
// Helps password to doesn't show to user
UserSchema.methods.toJSON = function() {
    let obj = this.toObject() // Convert to the Object
    delete obj.password;
    return obj;
}

export default mongoose.model('User', UserSchema);
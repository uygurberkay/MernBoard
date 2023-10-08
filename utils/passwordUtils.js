import bcrypt from 'bcryptjs';

/* Convert entry password to the hashed one */
export const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // It makes code run slower
    const hashedPassword = await bcrypt.hash(password, salt) 
    return hashedPassword;
}

/* Compare Hashed password and entry password is match */
export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}
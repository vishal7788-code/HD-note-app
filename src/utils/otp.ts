export const generateOtp = ():string => {
    const otp = Math.floor(100000+ Math.random() * 900000); // generate six digit otp
    return otp.toString();
}

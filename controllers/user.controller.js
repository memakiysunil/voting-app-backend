const User = require('../models/user.model');
const {generateToken} = require('../middlewares/auth.middleware');

exports.signup = async(req, res, next) => {
    try{
        const data = req.body;

        const adminUser = await User.findOne({role: 'admin'});
        if(data.role === 'admin' && adminUser){
            const error = new Error('Admin user already exists');
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findOne({email:data.email});
        if(user){
            const error = new Error('Email is already registered');
            error.statusCode = 400;
            return next(error);
        }

        if(!/^\d{12}$/.test(data.aadharCardNumber)){
            const error = new Error('Aadhar Card Number must be exactly 12 digits');
            error.statusCode = 400;
            return next(error);
        } 

        const existingUser = await User.findOne({aadharCardNumber: data.aadharCardNumber});
        if(existingUser){
            const error = new Error('User with the same Aadhar Card Number already exists');
            error.statusCode = 400;
            return next(error);
        }

        const newUser = new User(data);
        const response = await newUser.save();

        const payload = {id: response.id};
        const token = generateToken(payload);

        res.status(201).json({success: true, response , token});
 
    }
    catch(err){
        next(err);
    }
};
 

exports.login = async (req, res, next) => {
    try{
        const{aadharCardNumber,password} = req.body;

        if(!aadharCardNumber || ! password){
            const error = new Error('Aadhar Card Number and password are required');
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findOne({aadharCardNumber});

        if(!user || !(await user.comparePassword(password))){
            const error = new Error('Invalid Aadhar Card Number or Password');
            error.statusCode = 401;
            return next(error);
        }
        const payload = {id:user.id};
        const token = generateToken(payload);

        res.json({
            success: true,
            message: 'Login successful',
            token
        });
    }
    catch(err){
        next(err);
    }
};

exports.getProfile = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({success: true, user});
    }
    catch(err){
        next(err);
    }
};

exports.updatePassword = async (req, res, next) => {
    try{
        const{currentPassword, newPassword} = req.body;

        if(!currentPassword || ! newPassword){
            const error = new Error('Both currentPassword and newPassword are required');
            error.statusCode = 400;
            return next(error);
        }

        const user = await User.findById(req.user.id);

        if(!user || !(await user.comparePassword(currentPassword))){
            const error = new Error('Invalid current password');
            error.statusCode = 400;
            return next(error);
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({success: true, message: 'Password updated'});

        }
        
        catch(err){
            next(err);
        }
};

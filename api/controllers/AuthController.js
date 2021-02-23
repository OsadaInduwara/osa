const { User } = require("../models/UserModel");

exports.registerUser = async (req, res) => {
    const user = new User(req.body);
    

    await user.save((err, doc) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Please enter unique phone number & username!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully Signed Up!"
            });
        }
    });
};

exports.loginUser = (req, res) => {

    User.findOne({ phone_number: req.body.phone_number }, (err, user) => {
        if (!user) {
            return res.status(404).json({ success: false, message: "User phone number not found!" });
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
            
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: "Wrong Password!" });
                } else {
                    user.generateToken((err, token) => {
                        if (err) {
                            return res.status(400).send({ 'success': false, message: err });
                        } else {
                            res.status(200).json({
                                success: true,
                                message: "Successfully Logged In!",
                                data: {
                                    "token": token
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.getUserDetails= (req, res) => {
    res.json({status: true, message: "User Received!", data: req.user});
};
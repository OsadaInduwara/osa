//const UserRole = require("../enums/UserRole");
//const { User } = require("../models/UserModel");
const { Service } = require("../models/ServiceModel");

exports.searchServices = (req, res) => {
    var searchString = req.body.term;

    if(!searchString) {
        return res.status(422).json({
            success: false,
            message: "Search term is required!"
        });
    }
    
    Service.find({
        $or: [
            {title: {$regex: searchString, $options: 'i'}},
            {description: {$regex: searchString, $options: 'i'}}
        ]
    }, function(err, services){
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Error filteting services!",
                data: err
            });
        }

        return res.status(422).json({
            success: true,
            message: "Filtered services!",
            data: services
        });
    });
};
exports.createAppoinment = async (req, res) => {
    await AppoinmentTag.findById(req.body.Appoinment_tag, async function(err, AppoinmentTag) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service tag id!"
            });
        }

        if(!AppoinmentTag) {
            return res.status(422).json({
                success: false,
                message: "Invalid appoinment tag id!"
            });
        }

        var newAppoinment = new Appoinment(req.body);

        newAppoinment.customer = req.user._id;

        await newAppoinment.save((err, appoinment) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: "Unable to create appoinment!",
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "New appoinment is created!",
                    data: appoinment
                });
            }
        });
    });
};

// exports.viewAgentById = async (req, res) => {
//     await User.findOne({ _id: req.params.id }, (err, agent) => {
//         if (err) {
//             return res.status(422).json({
//                 success: false,
//                 message: "Invalid agent id!"
//             });
//         }

//         if(!agent) {
//             return res.status(422).json({
//                 success: false,
//                 message: "Invalid agent id!"
//             });
//         }

//         if(agent.role != UserRole.AGENT) {
//             return res.status(422).json({
//                 success: false,
//                 message: "Invalid agent  id!"
//             });
//         }
        
//         return res.status(422).json({
//             success: true,
//             message: "agent received!",
//             data: agent
//         });
//     });
// };
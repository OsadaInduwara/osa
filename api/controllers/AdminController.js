const UserRole = require("../enums/UserRole");
const { User } = require("../models/UserModel");
const { Service } = require("../models/ServiceModel");
const { ServiceTag } = require("../models/ServiceTagModel");

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
exports.viewAgentById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, agent) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid agent id!"
            });
        }

        if(!agent) {
            return res.status(422).json({
                success: false,
                message: "Invalid agent id!"
            });
        }

        if(agent.role != UserRole.AGENT) {
            return res.status(422).json({
                success: false,
                message: "Invalid agent  id!"
            });
        }
        
        return res.status(422).json({
            success: true,
            message: "agent received!",
            data: agent
        });
    });
};
exports.createServiceTag = async (req, res) => {
    var newServiceTag = new ServiceTag(req.body);

    await newServiceTag.save((err, serviceTag) => {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to create service tag!",
                data: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New service tag is created!",
                data: serviceTag
            });
        }
    });
};

exports.getAllServiceTags = (req, res) => {
    ServiceTag.find(function(err, serviceTags) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive service tags!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received service tags!",
            data: serviceTags
        });
    });
};

exports.createService = async (req, res) => {
    await ServiceTag.findById(req.body.service_tag, async function(err, serviceTag) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service tag id!"
            });
        }

        if(!serviceTag) {
            return res.status(422).json({
                success: false,
                message: "Invalid service tag id!"
            });
        }

        var newService = new Service(req.body);

        newService.agent = req.user._id;

        await newService.save((err, service) => {
            if (err) {
                return res.status(422).json({
                    success: false,
                    message: "Unable to create service!",
                    data: err
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: "New service is created!",
                    data: service
                });
            }
        });
    });
};

exports.getAllServices = async (req, res) => {
    await Service.find(function(err, services) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Unable to retrive services!",
                data: err
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Received services!",
            data: services
        });
    });
};

exports.getServiceById = async (req, res) => {
    await Service.findById(req.params.id, async function(err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Service received!",
            data: service
        });
    });
};

exports.updateService = async (req, res) => {
    await Service.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        if(!service) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Service updated!",
            data: service
        });
    });
};

exports.deleteService = async (req, res) => {
    await Service.remove({_id: req.params.id}, function(err, service) {
        if (err) {
            return res.status(422).json({
                success: false,
                message: "Invalid service id!"
            });
        }

        return res.status(422).json({
            success: true,
            message: "Service deleted!"
        });
    });
};
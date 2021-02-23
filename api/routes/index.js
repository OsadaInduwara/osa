var express = require('express');
var router = express.Router();

router.get('/api/v1', function(req, res){    
    res.send("Welcome to ABC SERVICE CENTER API!");
});

require('./AuthRoutes')(router);
require('./CustomerRoutes')(router);
require('./AgentRoutes')(router);

module.exports.router = router;
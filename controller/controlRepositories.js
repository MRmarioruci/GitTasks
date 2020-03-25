var repositoryModel = require('../model/repository_model.js');
var user = require('../lib/user.js');

module.exports = {
	run:function (router,connection,responses){
		router.post('/addRepo',(req,res) => {
			let request = req.body;
			if(req.session.email) {
				if(request.name && request.path && request.color){
					user.getUserId(req.session.email,connection,function(err,response){
						repositoryModel.add(request.name,request.path,request.color,response.id,connection, function(err, response){
							console.log(response);
						})
					})
				}else{
					//TBI
				}
			}else{
				//TBI
				console.log('not logged');
			}
		})
	},
}
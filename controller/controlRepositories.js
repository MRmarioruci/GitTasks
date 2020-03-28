var repositoryModel = require('../model/repository_model.js');
var user = require('../lib/user.js');
var error = require('../lib/errorCodes.js');

module.exports = {
	run:function (router,connection,logger){
		router.post('/addRepo',(req,res) => {
			let request = req.body;
			if(req.session.email) {
				if(request.name && request.path && request.color){
					user.getUserId(req.session.email,connection,function(err,response){
						if(response){
							repositoryModel.add(request.name,request.path,request.color,response.id,connection, function(err, response){
								if(!err){
									logger.log('info', 'Repo added');
									res.json({'code':1,'data':response});
								}else{
									res.json(error.getError('QUERY'));
								}
							})
						}else{
							res.json(error.getError('QUERY'));
						}
					})
				}else{
					res.json(error.getError('INVALID_PARAMS'));
				}
			}else{
				res.json(error.getError('NOT_LOGGED'));
			}
		}),
		router.post('/getRepositories',(req,res) => {
			let request = req.body;
			if(req.session.email) {
				user.getUserId(req.session.email,connection,function(err,response){
					if(response){
						repositoryModel.get(response.id,connection, function(err, response){
							if(!err){
								res.json({'code':1,'data':response});
							}else{
								res.json(error.getError('QUERY'));
							}
						})
					}else{
						res.json(error.getError('QUERY'));
					}
				})
			}else{
				res.json(error.getError('NOT_LOGGED'));
			}
		}),
		router.post('/deleteRepo',(req,res) => {
			let request = req.body;
			if(req.session.email) {
				if(request.id){
					user.getUserId(req.session.email,connection,function(err,response){
						if(response){
							repositoryModel.delete(request.id,response.id,connection, function(err, response){
								if(!err){
									logger.log('info', 'Repo deleted');
									res.json({'code':1,'data':response});
								}else{
									res.json(error.getError('QUERY'));
								}
							})
						}else{
							res.json(error.getError('QUERY'));
						}
					})
				}else{
					res.json(error.getError('INVALID_PARAMS'));
				}
			}else{
				res.json(error.getError('NOT_LOGGED'));
			}
		})
	},
}
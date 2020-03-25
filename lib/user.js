module.exports = {
    getUserId:function(email,connection,cb){
        var q='SELECT `Users`.`id` FROM `Users` WHERE `Users`.`email` = ?';
		connection.query(q,[email] ,function(err, rows, fields) {
			if (!err){
				if(rows.length>0){
                    cb(null,rows[0]);
                }
            }else{
                cb('Err',null);
            }
        });
    }
};
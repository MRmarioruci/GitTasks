module.exports = {
    add:function(name,path,color,user_id,connection,cb){
        var q='INSERT INTO `Repositories`(`name`,`path`,`color`,`user_id`) VALUES(?,?,?,?)';
		connection.query(q,[name,path,color,user_id] ,function(err, rows, fields) {
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
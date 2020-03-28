module.exports = {
    add:function(name,path,color,user_id,connection,cb){
        var q = 'INSERT INTO `Repositories`(`name`,`path`,`color`,`user_id`) VALUES(?,?,?,?)';
		connection.query(q,[name,path,color,user_id] ,function(err, rows, fields) {
			if (!err){
				if(rows){
                    cb(null,rows.insertId);
                }else{
                    cb('Err',null);
                }
            }else{
                cb('Err',null);
            }
        });
    },
    get:function(user_id,connection,cb){
        var q = 'SELECT \
        `Repositories`.`id`, \
        `Repositories`.`name`, \
        `Repositories`.`path`, \
        `Repositories`.`color` \
        FROM `Repositories` \
        WHERE `Repositories`.`user_id` = ?';
		connection.query(q,[user_id] ,function(err, rows, fields) {
			if (!err){
				if(rows.length > 0){
                    cb(null,rows);
                }else{
                    cb('Err',null);
                }
            }else{
                cb('Err',null);
            }
        });
    },
    delete:function(id,user_id,connection,cb){
        var q = 'DELETE FROM `Repositories` \
        WHERE `Repositories`.`id` = ? AND `Repositories`.`user_id` = ?';
		connection.query(q,[id,user_id] ,function(err, rows, fields) {
			if (!err){
				if(rows){
                    cb(null,true);
                }else{
                    cb('Err',null);
                }
            }else{
                console.log(err);
                cb('Err',null);
            }
        });
    },
};
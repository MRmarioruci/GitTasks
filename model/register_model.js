const register = (email,password,cb) => {
    if(!email || !password) return cb('Too few arguments',null);
    /** TBI store in db */
    if(cb) cb(null,'ok')
}
module.exports = {
    register
};
const login = (email,password) => {
    if(!email || !password) return cb('Too few arguments',null);
    /** Get password where db_email  = email and then check if password match
     * return correct response
     */
}
module.exports = {
    login,
}
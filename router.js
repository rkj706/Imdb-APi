
'use strict';
var auth=require('./auth/auth.service');
module.exports = function (app, passport) {

    app.use('/auth',require('./auth'));
    app.use('/api',auth.verifyToken,require('./api'));
    app.use('/logout',logOut)
};

function logOut(req,res) {
    req.logout();
    req.session.destroy(function (err) {
        res.clearCookie('token');
        res.redirect('/'); //Inside a callback… bulletproof!
    });
}

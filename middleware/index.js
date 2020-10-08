const Campground = require('../models/campground');
const Comment = require('../models/comment');

//all the middleware goes here
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                res.redirect('back');
            } else {
            //does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            }  else {
                res.redirect('back');
                    }  
                }
            });
        } else {
            res.redirect('back');
    }
}


middlewareObj.checkCommentOWnership = function (req, res, next) {
    //is user logged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                req.flash('error', 'Campgrond not found');
                res.redirect('back');
            } else {
                //does user own the comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                }  else {
                    req.flash('error', 'I don\'t think you have the facilities for that big man');
                    res.redirect('back');
                }  
            }
        });
    } else {
        req.flash('error', 'I don\'t think you have the facilities for that big man');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'I don\'t think you have the facilities for that big man');
    res.redirect('/login');
}



module.exports = middlewareObj;
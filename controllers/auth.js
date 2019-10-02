const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

const User= require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login');
  };

  exports.getSignup = (req, res, next) => {
    res.render('auth/signup');
  };
  
  exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.redirect('/login');
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              console.log("succes");
              console.log(doMatch);
              //req.session.isLoggedIn = true;
              // req.session.user = user;
              // return req.session.save(err => {
              //   console.log(err);
              //   res.redirect('/'); });
              res.redirect('/');
            }
            else{
              console.log(doMatch);
              res.redirect('/login');
            }
           
          })
          .catch(err => {
            
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch(err => console.log(err));
  };
  
  exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
      .then(userDoc => {
        if (userDoc) {
          return res.redirect('/signup');
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              email: email,
              password: hashedPassword 
            });
            return user.save();
          })
          .then(result => {
            res.redirect('/login');
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
  };

  //API 
  exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      })
      .then(isEqual => {
        if (!isEqual) {
          const error = new Error('Wrong password!');
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          'somesupersecretsecret',
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token, userId: loadedUser._id.toString() });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
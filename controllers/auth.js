const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport=require('nodemailer-sendgrid-transport');


const User= require('../models/user');

const transporter= nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:'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'

  }
}));

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
              req.session.isLoggedIn = true;
              req.session.user = user;
               return req.session.save(err => {
              console.log(err);
               res.redirect('/'); });  
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
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
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
              password: hashedPassword,
              name:{firstName,lastName},
              status:'normal',
              projects:[]
            });
            return user.save();
          })
          .then(result => {
            res.redirect('/login');
            
           return transporter.sendMail({
              to:email,
              from:'no-reply@BIM4ProjectManagement.com',
              subject:'Signup succeeded!',
              html:'<h1> You successfully signed up! </h1>'
            })
            .catch(err=>{
              console.log(err);
            });
            
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/login');
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
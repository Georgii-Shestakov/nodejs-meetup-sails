/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt')

module.exports = {

  attributes: {
    email: {
       type: 'email',
       required: true,
       unique: true
     },

    password: {
      type: 'string',
      required: true,
      minLength: 6
    },

    // We don't wan't to send back encrypted password either
     toJSON: function () {
       let obj = this.toObject()
       delete obj.password
       return obj
     }
  },

  // Here we encrypt password before creating a User
 beforeCreate : (values, next) => {
   bcrypt.genSalt(10,  (err, salt) => {
     if (err) {
        return next(err)
     }

     bcrypt.hash(values.password, salt,  (err, hash) => {
       if (err) {
          return next(err)
       }
       values.password = hash
       next()
     })

   })
 },
 comparePassword :  (password, user, cb) => {
   bcrypt.compare(password, user.password, cb)
 }

};

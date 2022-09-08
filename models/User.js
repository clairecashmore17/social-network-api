const { Schema, model } = require("mongoose");
//validating email
const validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

//create our user schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Please provide a username!",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Please provide an email!",
      validate: [validateEmail, "Please provide a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual to keep track of friends count
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//create the User model using our schema
const User = model("User", UserSchema);

module.exports = User;

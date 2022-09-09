const { Schema, model, Types } = require("mongoose");
const validateLength = function (thoughtText) {
  if (thoughtText.length < 1 || thoughtText.length > 280) {
    return false;
  }
};

//Reaction schema to be tied to reactions[] in thoughts
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: "Please enter a reaction!",
      validate: [validateLength, "Please only have 1-280 characters!"],
    },
    username: {
      type: String,
      required: "Please provide a username!",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Please enter a thought!",
      validate: [validateLength, "Please only have 1-280 characters!"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//retrieve the number of reactions each thought has
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create out model
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;

import mongoose from "mongoose";
import moment from "moment";

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["MainJuin", "SubJuin", "User"],
    default: "User",
  },
  register_date: {
    type: Date,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  comments: [
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId, //
        ref: "posts",
      },
      comment_id: {
        type: mongoose.Schema.Types.ObjectId, //post 삭제시 댓글도 함께 삭제하기 위하여 결합
        ref: "comments",
      },
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
});

const User = mongoose.model("user", UserSchema);

export default User;
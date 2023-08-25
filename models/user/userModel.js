import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = schema(
  {
    fullname: {
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
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    // Google and Facebook IDs for Social Signins
    google_ID: {
      type: String,
      sparse: true,
    },
    facebook_ID: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

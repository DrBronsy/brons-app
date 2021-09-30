import * as mongoose from 'mongoose';
const { Schema } = mongoose;

import plugins from './plugins';

const userSchema = new Schema({
  displayName: {
    type: String,
    default: 'NoName'
  },
  scores: {
    type: Number,
    required: false,
    default: 1000
  },
  includes: {
    type: Object,
    required: false,
    default: {}
  },
  steam: {
    steamid: {
      type: String,
      required: true,
      unique: true
    },
    lvl: String,
    communityvisibilitystate: Number,
    profilestate: Number,
    personaname: String,
    commentpermission: Number,
    avatar: String,
    avatarmedium: String,
    avatarfull: String,
    avatarhash: String,
    lastlogoff: Number,
    personastate: Number,
    primaryclanid: String,
    timecreated: Number,
    personastateflags: Number
  },
  csgoStat: {
    type: Object,
    required: false,
    default: {}
  }
}, {
  timestamps: true,
});

userSchema.plugin(plugins.toJSON);
userSchema.plugin(plugins.paginate);

export default mongoose.model('User', userSchema);
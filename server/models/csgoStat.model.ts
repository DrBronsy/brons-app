import * as mongoose from 'mongoose';
const { Schema } = mongoose;

import plugins from './plugins';

const csgoStatSchema = new Schema({

}, {
  timestamps: true,
});

csgoStatSchema.plugin(plugins.toJSON);
csgoStatSchema.plugin(plugins.paginate);

export default mongoose.model('CsgoStat', csgoStatSchema);
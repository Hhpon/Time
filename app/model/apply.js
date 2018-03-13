
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ApplySchema = new Schema({
        url: {type: String},
        urlSex: {type: String},
        nickname: { type: String },
        sex: { type: String },
        applyCon: { type: String },
        grade: { type: String },
        openid: { type: String },
        onceId: { type: String } 
    });

    return mongoose.model('Apply', ApplySchema);
}


module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CapsuleSchema = new Schema({
        calendar: { type: String },
        accepter: { type: String },
        msgStyle: { type: String },
        wcNum: { type: String },
        content: { type: String },
        nickname: { type: String },
        openid: { type: String },
        aleady: { type: Number },
        todayTime: { type: String }
    });

    return mongoose.model('Capsule', CapsuleSchema);
}

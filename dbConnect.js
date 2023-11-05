const mongoose = require('mongoose');

const dbConnect = () => {

    mongoose.connect('mongodb://127.0.0.1:27017/Office?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
        .catch(err => console.log('>>>>>>>>> DB Error: ', err));
};

module.exports = dbConnect;

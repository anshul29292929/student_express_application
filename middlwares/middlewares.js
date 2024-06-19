
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        const unisuffix = Date.now()
        cb(null, unisuffix + '-' + file.originalname )
    }
})

const upload = multer({
    storage:storage
})

module.exports={
    upload
}
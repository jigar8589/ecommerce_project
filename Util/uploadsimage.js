
const multer =  require('multer')
const path = require('path')
require("")


async function uploadsIamge(req,res) {
  


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('../public/uploads'))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

}


  module.exports ={
    uploadsIamge
  }
import path from "path";
import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/imgs")
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({
  storage: storage
})
import multer from 'multer'

const TMP_DIR = process.env.TMP_DIR

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TMP_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname)
  },
})

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1048576,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
    } else {
      cb(new Error('Wrong format file'))
    }
  },
})

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

function UploadMiddleware() {
  return upload.single('document');
}

export default UploadMiddleware;

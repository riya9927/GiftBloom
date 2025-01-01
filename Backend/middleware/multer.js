// import multer from "multer";

// const storage = multer.diskStorage({
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload=multer({storage})

// export default upload


// import multer from "multer";
// import path from "path";

// // Configure Multer storage with unique filenames
// const storage = multer.diskStorage({
//     filename: function (req, file, callback) {
//         const timestamp = Date.now();
//         const extension = path.extname(file.originalname);
//         const fileName = `${timestamp}_${file.fieldname}${extension}`;
//         callback(null, fileName);
//     }
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import path from "path";

// Configure Multer storage with unique filenames
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const fileName = `${timestamp}_${file.fieldname}${extension}`;
        callback(null, fileName);
    }
});

const upload = multer({ storage });

export default upload;

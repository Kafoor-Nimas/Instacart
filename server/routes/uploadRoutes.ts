import express from "express";
import auth from "../middleware/auth.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }
    // to convert image to base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "grocery-del",
      resource_type: "auto",
    });

    res.json({ url: result.secure_url });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default uploadRouter;

// import express from "express";
// import auth from "../middleware/auth.js";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import streamifier from "streamifier";

// // Configure cloudinary directly here
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Add this line:
// console.log("Cloudinary config:", cloudinary.config());

// const uploadRouter = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// uploadRouter.post("/", auth, upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image file provided" });
//     }

//     const streamUpload = () =>
//       new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           // { folder: "grocery-del" },
//           {
//             folder: "grocery-del",
//             use_filename: true,
//             unique_filename: true,
//           },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           },
//         );
//         streamifier.createReadStream(req.file!.buffer).pipe(stream);
//       });

//     const result: any = await streamUpload();
//     res.json({ url: result.secure_url });
//   } catch (error: any) {
//     console.error("UPLOAD ERROR:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// });

// export default uploadRouter;

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "/upload");
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname);
  },
});

const upload = multer({ storage: storage });

export default upload;

// import { Request } from "express";
// import multer, { FileFilterCallback } from "multer";

// type DestinationCallback = (error: Error | null, destination: string) => void;
// type FileNameCallback = (error: Error | null, filename: string) => void;

// export const fileStorage = multer.diskStorage({
//   destination: (
//     request: Request,
//     callback: DestinationCallback
//   ): void => {
//    function (req: any, file: any, cb: any) {
//     cb(null, "/upload");
//   },

//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     callback: FileNameCallback
//   ): void => {
//     // ...Do your stuff here.
//   },
// });

// const upload = multer({ storage: fileStorage });
// export default upload;

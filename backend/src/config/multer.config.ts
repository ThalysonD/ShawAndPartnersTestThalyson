import multer, { FileFilterCallback, StorageEngine } from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(__dirname, "..", "..", "uploads");

const createUploadsDir = () => {
  try {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  } catch (error) {
    console.error(
      `Error creating uploads directory: ${(error as Error).message}`
    );
    throw new Error("Failed to create uploads directory");
  }
};

createUploadsDir();

const storage: StorageEngine = multer.diskStorage({
  destination: (_req, _file, cb) => {
    try {
      cb(null, uploadsDir);
    } catch (error) {
      cb(error as Error, "");
    }
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const sanitizedFilename = file.fieldname
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${sanitizedFilename}-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "text/csv" ||
    path.extname(file.originalname).toLowerCase() === ".csv"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .csv files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

export default upload;

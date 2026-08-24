import process from "node:process";
import { stat } from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";

const [filePath, requestedPublicId] = process.argv.slice(2);

function errorMessage(error) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    if (typeof error.message === "string" && error.message) {
      return error.message;
    }
  }
  return "Cloudinary upload failed";
}

const requiredEnv = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length) {
  console.error(`Missing environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

if (!filePath) {
  console.error(
    "Usage: pnpm exec node scripts/upload-cloudinary-large.mjs <video-path> [public-id]",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

try {
  const fileStats = await stat(filePath);
  if (!fileStats.isFile()) {
    throw new Error("The upload path must point to a video file, not a folder.");
  }

  console.log(`Uploading ${filePath} in 20 MB chunks...`);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      filePath,
      {
        resource_type: "video",
        folder: "portfolio-demos",
        public_id: requestedPublicId,
        chunk_size: 20 * 1024 * 1024,
        use_filename: !requestedPublicId,
        unique_filename: !requestedPublicId,
        overwrite: false,
      },
      (error, uploadResult) => {
        if (error) {
          reject(new Error(errorMessage(error)));
        } else {
          resolve(uploadResult);
        }
      },
    );
  });

  console.log("Upload complete.");
  console.log(`Public ID: ${result.public_id}`);
  console.log(`Video URL: ${result.secure_url}`);
  console.log(
    `Poster URL: ${result.secure_url.replace(/\.[^/.]+$/, ".jpg")}`,
  );
} catch (error) {
  console.error("Cloudinary upload failed:", errorMessage(error));
  process.exit(1);
}

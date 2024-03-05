import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/loom/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>({
	url: "/loom/api/uploadthing",
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
	url: "/loom/api/uploadthing",
});

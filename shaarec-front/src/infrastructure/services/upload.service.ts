import { mkdir, writeFile } from "fs/promises";
import path from "path";

const UPLOADS_DIR = process.env.UPLOADS_DIR || "./uploads";

export async function saveFile(
  buffer: Buffer,
  subdir: string,
  filename: string
): Promise<string> {
  const dir = path.join(UPLOADS_DIR, subdir);
  await mkdir(dir, { recursive: true });

  const filePath = path.join(dir, filename);
  await writeFile(filePath, buffer);

  return filePath;
}

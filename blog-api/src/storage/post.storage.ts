import fs from "fs";
import path from "path";
import { Post } from "../models/post.model";

const DATA_FILE = path.join(__dirname, "../../data/posts.json");

export function readPosts(): Post[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }

  const data = fs.readFileSync(DATA_FILE, "utf-8");

  if (!data) return [];

  return JSON.parse(data);
}

export function writePosts(posts: Post[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

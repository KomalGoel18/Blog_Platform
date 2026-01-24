import { Post } from "../models/post.model";
import { readPosts, writePosts } from "../storage/post.storage";
import { generateId } from "../utils/id.generator";

export function getAllPosts(): Post[] {
  return readPosts();
}

export function getPostById(id: number): Post | null {
  const posts = readPosts();
  return posts.find((p) => p.id === id) || null;
}

export function createPost(
  title: string,
  content: string,
  author?: string
): Post {
  const posts = readPosts();

  const now = new Date().toISOString();

  const newPost: Post = {
    id: generateId(posts),
    title,
    content,
    author: author || "Anonymous",
    createdAt: now,
    updatedAt: now,
  };

  posts.push(newPost);
  writePosts(posts);

  return newPost;
}

export function updatePost(
  id: number,
  title?: string,
  content?: string
): Post | null {
  const posts = readPosts();
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) return null;

  if (title !== undefined) posts[index].title = title;
  if (content !== undefined) posts[index].content = content;

  posts[index].updatedAt = new Date().toISOString();

  writePosts(posts);
  return posts[index];
}

export function deletePost(id: number): boolean {
  const posts = readPosts();
  const filtered = posts.filter((p) => p.id !== id);

  if (filtered.length === posts.length) return false;

  writePosts(filtered);
  return true;
}

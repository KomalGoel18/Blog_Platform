import { Request, Response, NextFunction } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../services/post.service";
import {
  validateCreatePost,
  validateUpdatePost,
} from "../validators/post.validator";
import { isValidId } from "../utils/validateId";

/**
 * GET /api/posts
 */
export function getAllPostsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = getAllPosts();
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/posts/:id
 */
export function getPostByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const id = Number(req.params.id);
    const post = getPostById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/posts
 */
export function createPostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const error = validateCreatePost(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const { title, content, author } = req.body;
    const post = createPost(title, content, author);

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/posts/:id
 */
export function updatePostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    const error = validateUpdatePost(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const id = Number(req.params.id);
    const { title, content } = req.body;

    const updatedPost = updatePost(id, title, content);

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/posts/:id
 */
export function deletePostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const deleted = deletePost(id);

    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

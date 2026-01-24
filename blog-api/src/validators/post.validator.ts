export function validateCreatePost(body: any): string | null {
  const { title, content } = body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return "Title is required and must be a non-empty string";
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    return "Content is required and must be a non-empty string";
  }

  return null;
}

export function validateUpdatePost(body: any): string | null {
  const { title, content } = body;

  if (
    title === undefined &&
    content === undefined
  ) {
    return "At least one field (title or content) must be provided";
  }

  if (title !== undefined && typeof title !== "string") {
    return "Title must be a string";
  }

  if (content !== undefined && typeof content !== "string") {
    return "Content must be a string";
  }

  return null;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  error: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  author?: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

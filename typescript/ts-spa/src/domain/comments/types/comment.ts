interface Comments {
  id: number,
  post_id: number,
  user_id: number,
  body: string,
  created_at: Date,
  updated_at: Date
}

export default Comments;

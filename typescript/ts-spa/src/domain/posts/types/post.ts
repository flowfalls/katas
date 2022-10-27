interface Posts {
  id: number,
  user_id: number,
  title: string,
  body: string,
  status: string,
  created_at: Date,
  updated_at: Date
}

export default Posts;

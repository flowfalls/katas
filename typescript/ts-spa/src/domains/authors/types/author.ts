type Gender = 'Male' | 'Female';

interface Author {
  id: number,
  name: string,
  email: string,
  gender: Gender,
  status: string,
  created_at: Date,
  updated_at: Date
}

export default Author;

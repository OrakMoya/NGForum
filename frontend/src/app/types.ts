// Tipovi podataka za FRONTEND DIO

export type Post = {
  id: string,
  author_id: string,
  contents: string,
  author: User | null,
  timestamp: number
}

export type User = {
  id: string,
  displayName: string,
  username: string,
  email: string
}

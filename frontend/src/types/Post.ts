export type PostType = {
  userId: string
  gameId: string
  gameName: string
  img?: string // Optional property
  _id: string
  createdAt: string
  onPostDeleted: (id: string) => void
}

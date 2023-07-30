import { User } from "./User"

export type Comment = {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  user: User,
  replies?: Comment[],
  replying?: boolean
}
import { Dispatch, createContext } from "react";
import { User } from "../../models/User";
import { Comment } from "../../models/Comment";
import { Action } from "./AppReducer";

export const CommentsContext = createContext<Comment[]>([])
export const CommentsDispatchContext = createContext<Dispatch<Action> | null>(null)
export const CurrentUserContext = createContext<User | null>(null)
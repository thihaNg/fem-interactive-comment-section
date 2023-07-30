import { Comment } from "../../models/Comment";
import { User } from "../../models/User";

export type Action = {
  type: string
  commentId: number
  content?: string
  replyTo?: number
  newScore?:number
}

export type AppState = {
  currentUser: User
  comments: Comment[]
}

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'comment-added': {

      if (action.content) {
        return {
          ...state,
          comments: [
            ...state.comments,
            {
              //id: new Date().getTime(),
              id: action.commentId,
              content: action.content,
              score: 0,
              createdAt: 'Just now',
              replies: [],
              user: state.currentUser
            }
          ]
        }
      } else {
        throw new Error('Empty content exception.')
      }

    }

    case 'comment-edited': {
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.commentId) {
            return ({
              ...comment,
              content: action.content ? action.content : ''
            })
          } else return comment
        })
      }
    }

    case 'comment-deleted': {
      return {
        ...state,
        comments: state.comments.map(comment => {
          return ({
            ...comment,
            replies: comment.replies?.filter(reply => reply.id !== action.commentId)
          })
        }).filter(comment => comment.id !== action.commentId)
      }
    }
    case 'reply-added': {
      if (action.replyTo !== undefined) {
        return {
          ...state,
          comments: state.comments.map(comment => {
            if (comment.id === action.replyTo) {
              return {
                ...comment,
                replies: [...comment.replies ? comment.replies : [], {
                  id: action.commentId,
                  content: action.content? action.content : '',
                  score: 0,
                  createdAt: 'Just now',
                  replies: [],
                  user: state.currentUser
                }]
              }
            } else {
              return comment
            }
          })
        }
      } else {
        throw new Error('Empty replyTo')
      }
    }

    case 'toggle-replying': {
      // if(action.commentId !== undefined) {
        return {
          ...state,
          comments: state.comments.map(comment => {
            return ({
              ...comment,
              replying: comment.id === action.commentId? !comment.replying : comment.replying,
              replies: comment.replies?.map(reply => ({
                ...reply,
                replying: reply.id === action.commentId? !reply.replying : reply.replying
              }))
            })
          })
        }
      // } else {
      //   throw new Error('Empty comment ID')
      // }
    }

    case 'score-changed': {
      return {
        ...state,
        comments: state.comments.map(comment => ({
          ...comment,
          score: comment.id === action.commentId? (action.newScore !== undefined? action.newScore : comment.score) : comment.score,
          replies: comment.replies?.map(reply => ({
            ...reply,
            score: reply.id === action.commentId? (action.newScore !== undefined? action.newScore : reply.score) : reply.score
          }))
        }))
      }
    }
    default: return state
  }
}
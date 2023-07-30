import { useContext, useReducer } from 'react'
import { CommentsContext, CommentsDispatchContext, CurrentUserContext } from './AppContext'
import styles from '../../styles/CommentSection.module.css'
import CommentRow from './components/CommentRow'
import CommentInput from './components/CommentInput'

export const CommentSection: React.FC = () => {

  console.log('PUBLIC_URL', process.env.PUBLIC_URL)

  const comments = useContext(CommentsContext)
  const currentUser = useContext(CurrentUserContext)
  const dispatch = useContext(CommentsDispatchContext)

  const handleSendMessageClick = (content: string) => {
    if (dispatch) {
      dispatch({
        type: 'comment-added',
        commentId: new Date().getTime(),
        content
      })
    }
  }

  const handleSendReplyClick = (id: number, content: string) => {
    if(dispatch) {
      dispatch({
        type: 'reply-added',
        commentId: new Date().getTime(),
        content,
        replyTo: id
      })
      handleReplyClick(id)
    }
  }

  const handleReplyClick = (id: number) => {
    if(dispatch) {
      dispatch({
        type: 'toggle-replying',
        commentId: id
      })
    }
  }

  const handleDeleteClick = (id: number) => {
    if(dispatch) {
      dispatch({
        type: 'comment-deleted',
        commentId: id
      })
    }
  }

  const handleVoteChange = (id: number, newScore: number) => {
    if(dispatch) {
      dispatch({
        type: 'score-changed',
        commentId: id,
        newScore
      })
    }
  }

  return (
    <div
      className={`${styles.container}`}>
      {
        comments.map(comment => (
          <div
            key={comment.id}>
            <CommentRow
              onDeleteClick={handleDeleteClick}
              onReplyClick={handleReplyClick}
              onSendReplyClick={handleSendReplyClick}
              onVoteChange={handleVoteChange}
              comment={comment}
              isYou={currentUser?.username === comment.user.username} />
            {
              comment.replies && comment.replies.length !== 0 &&
              <div
                className={`${styles['replies-container']}`}>
                <div
                  className={`${styles['replies-horizontal-divider']}`}></div>
                <div
                  className={`${styles['reply-list-wrapper']}`}>
                  {
                    comment.replies.map(reply => (
                      <CommentRow
                        onDeleteClick={handleDeleteClick}
                        onSendReplyClick={handleSendReplyClick}
                        onReplyClick={handleReplyClick}
                        onVoteChange={handleVoteChange}
                        comment={reply}
                        isYou={currentUser?.username === reply.user.username} />
                    ))
                  }
                </div>
              </div>
            }
          </div>
        ))
      }
      <CommentInput
        styleProps={{
          marginTop: '18px'
        }}
        onSendMessageClick={handleSendMessageClick} />
    </div>
  )
}
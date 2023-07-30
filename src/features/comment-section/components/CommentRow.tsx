import Vote from '../../../components/Vote'
import Avatar from '../../../components/elements/Avatar'
import { TextButtonWithIcon } from '../../../components/elements/Button'
import useCheckIsMobile from '../../../hooks/useCheckIsMobile'
import { Comment } from '../../../models/Comment'
import styles from '../../../styles/CommentRow.module.css'
import IconReply from './../../../images/icon-reply.svg'
import IconDelete from './../../../images/icon-delete.svg'
import IconEdit from './../../../images/icon-edit.svg'
import CommentInput from './CommentInput'

type Props = {
  comment: Comment
  isYou: boolean
  onReplyClick?: (id: number) => void
  onSendReplyClick?: (id: number, content: string) => void
  onDeleteClick?: (id: number) => void
  onVoteChange?: (id: number, newScore: number) => void
}

const CommentRow: React.FC<Props> = ({
  comment,
  isYou,
  onReplyClick,
  onSendReplyClick,
  onDeleteClick,
  onVoteChange
}) => {

  const { mobile } = useCheckIsMobile()

  return (
    <div
      className={`${styles.container}`}>
      <div
        className={`${styles['comment-container']}`}>
        {
          !mobile &&
          <Vote
            count={comment.score}
            orientation='column'
            onVoteAdd={(n: number) => {
              if (onVoteChange) {
                onVoteChange(comment.id, n)
              }
            }}
            onVoteSub={(n: number) => {
              if (onVoteChange) {
                onVoteChange(comment.id, n)
              }
            }} />
        }
        <div
          className={`${styles['content-container']}`}>
          <div
            className={`${styles.header}`}>
            <Avatar
              width='32px'
              height='32px'
              src={comment.user.image.png} />
            <span
              className='card-title'>{comment.user.username}</span>
            {
              isYou &&
              <You />
            }
            <span
              className='card-caption'>{comment.createdAt}</span>
            {
              !mobile && !isYou &&
              <TextButtonWithIcon
                onClick={() => {
                  if (onReplyClick) {
                    onReplyClick(comment.id)
                  }
                }}
                label='Reply'
                icon={IconReply}
                styleProps={{
                  marginLeft: 'auto'
                }}
                type='positive' />
            }
            {
              !mobile && isYou &&
              <div
                className={`${styles['you-actions-wrapper']}`}>
                <TextButtonWithIcon
                  onClick={() => {
                    if (onDeleteClick) {
                      onDeleteClick(comment.id)
                    }
                  }}
                  label='Delete'
                  icon={IconDelete}
                  styleProps={{
                    marginLeft: 'auto'
                  }}
                  type='negative' />
                {/* <TextButtonWithIcon
                  label='Edit'
                  icon={IconEdit}
                  styleProps={{
                    marginLeft: '16px'
                  }}
                  type='positive' /> */}
              </div>
            }
          </div>
          <span
            className='card-body'
            style={{
              marginTop: '16px'
            }}>
            {comment.content}
          </span>
          {
            mobile &&
            <div
              className={`${styles['mobile-actions-container']}`}>
              <Vote
                count={comment.score}
                orientation='row'
                onVoteAdd={(n: number) => {
                  if (onVoteChange) {
                    onVoteChange(comment.id, n)
                  }
                }}
                onVoteSub={(n: number) => {
                  if (onVoteChange) {
                    onVoteChange(comment.id, n)
                  }
                }} />

              {
                !isYou &&
                <TextButtonWithIcon
                  onClick={() => {
                    if (onReplyClick) {
                      onReplyClick(comment.id)
                    }
                  }}
                  label='Reply'
                  icon={IconReply}
                  styleProps={{
                    marginLeft: 'auto'
                  }}
                  type='positive' />
              }
              {
                isYou &&
                <div
                  className={`${styles['you-actions-wrapper']}`}>
                  <TextButtonWithIcon
                    onClick={() => {
                      if (onDeleteClick) {
                        onDeleteClick(comment.id)
                      }
                    }}
                    label='Delete'
                    icon={IconDelete}
                    styleProps={{
                      marginLeft: 'auto'
                    }}
                    type='negative' />
                  {/* <TextButtonWithIcon
                    label='Edit'
                    icon={IconEdit}
                    styleProps={{
                      marginLeft: '16px'
                    }}
                    type='positive' /> */}
                </div>
              }
            </div>
          }
        </div>
      </div>
      {
        comment.replying &&
        <CommentInput
          styleProps={{
            marginTop: '12px'
          }}
          onSendMessageClick={(content: string) => {
            if (onSendReplyClick) {
              onSendReplyClick(comment.id, content)
            }
          }} />
      }
    </div>
  )
}

const You: React.FC = () => {
  return (
    <span
      className={`${styles.you}`}>
      you
    </span>
  )
}

export default CommentRow
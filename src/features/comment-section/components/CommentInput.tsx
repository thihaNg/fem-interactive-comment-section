import { ChangeEvent, useContext, useState } from "react"
import Avatar from "../../../components/elements/Avatar"
import { ContainedButton } from "../../../components/elements/Button"
import useCheckIsMobile from "../../../hooks/useCheckIsMobile"
import { User } from "../../../models/User"
import styles from '../../../styles/CommentInput.module.css'
import { CurrentUserContext } from "../AppContext"

type Props = {
  styleProps?: React.CSSProperties
  onSendMessageClick?: (content: string) => void
}

const CommentInput: React.FC<Props> = ({
  styleProps,
  onSendMessageClick
}) => {

  const currentUser = useContext(CurrentUserContext)
  const [message, setMessage] = useState('')

  const { mobile } = useCheckIsMobile()

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleSendBtnClick = () => {
    if(onSendMessageClick) {
      onSendMessageClick(message)
      setMessage('')
    }
  }

  return (
    <div
      style={{
        ...styleProps
      }}
      className={`${styles['container']}`}>
      {
        !mobile &&
        <Avatar
          width={"46px"}
          height={"46px"}
          src={currentUser ? currentUser.image.png : ''} />
      }
      <textarea
        placeholder="Add a comment"
        value={message}
        onChange={handleMessageChange} />
      {
        !mobile &&
        <ContainedButton
          label={"SEND"}
          disabled={message === ''}
          onClick={handleSendBtnClick} />
      }
      {
        mobile &&
        <div
          className={`${styles['mobile-container']}`}>
          <Avatar
            width={"46px"}
            height={"46px"}
            src={currentUser ? currentUser.image.png : ''} />
          <ContainedButton
            label={"SEND"}
            onClick={handleSendBtnClick}
            disabled={message === ''} />
        </div>
      }
    </div>
  )
}

export default CommentInput
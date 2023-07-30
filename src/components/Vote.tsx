import IconPlus from './../images/icon-plus.svg'
import IconMinus from './../images/icon-minus.svg'
import styles from '../styles/Vote.module.css'

type Props = {
  count: number
  orientation: 'row' | 'column'
  onVoteAdd?: (newScore: number) => void
  onVoteSub?: (newScore: number) => void
}

const Vote: React.FC<Props> = ({
  count,
  orientation,
  onVoteAdd,
  onVoteSub
}) => {
  return (
    <div
      className={`${styles.container} ${orientation === 'row' ? styles.row : styles.column}`}>
      <img
        onClick={() => {
          if (onVoteAdd) {
            onVoteAdd(count + 1)
          }
        }}
        src={IconPlus}
        style={{
          width: '12px',
          height: '12px',
          cursor: 'pointer'
        }} />
      <span>
        {count}
      </span>
      <img
        onClick={() => {
          if (onVoteSub) {
            onVoteSub(count - 1)
          }
        }}
        src={IconMinus}
        style={{
          width: '12px',
          height: '3px',
          cursor: 'pointer'
        }} />
    </div>
  )
}

export default Vote
import styles from '../../styles/Button.module.css'

type TextButtonWithIconProps = ButtonProps & {
  icon: string
  type: 'positive' | 'negative'
}

type ButtonProps = {
  styleProps?: React.CSSProperties
  label: string
  disabled?: boolean
  onClick?: () => void
}

export const TextButtonWithIcon: React.FC<TextButtonWithIconProps> = ({
  icon,
  label,
  styleProps,
  type,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        ...styleProps
      }}
      className={`${styles['text-with-icon-container']} ${styles['button']}`}>
      <img
        src={icon}
        width='12px'
        height='12px' />
      <span
        className={`${type === 'negative' ? styles['negative-label'] : ''}`}>{label}</span>
    </div>
  )
}

export const ContainedButton: React.FC<ButtonProps> = ({
  label,
  styleProps,
  disabled,
  onClick
}) => {

  return (
    <div
      onClick={() => {
        if (!disabled && onClick) {
          onClick()
        }
      }}
      style={{
        ...styleProps
      }}
      className={`${styles.button} ${disabled ? styles.disabled : styles.contained}`}>
      <span>{label}</span>
    </div>
  )
}
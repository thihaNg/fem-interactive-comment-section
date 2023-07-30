import styles from '../../styles/Avatar.module.css'

type Props = {
  width: string
  height: string
  src: string
}

const Avatar: React.FC<Props> = ({
  width,
  height,
  src
}) => {

  const localPath = '../../'

  return (
    <img
      src={src.slice(1)}
      width={width}
      height={height}
      className={`${styles.avatar}`} />
  )
}

export default Avatar
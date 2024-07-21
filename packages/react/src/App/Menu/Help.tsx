import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { style } from 'core/style'
import { useDisclosure } from '~/lib/hooks'

const Help = () => {
  const { onOpen } = useDisclosure()

  return (
    <div>
      <div className={style.menu.btns.off} onClick={onOpen}>
        <FontAwesomeIcon icon={faQuestion} size="xl" />
      </div>
    </div>
  )
}

export default Help

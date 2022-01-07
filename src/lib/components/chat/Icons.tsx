import { BsChatFill, BsX } from 'react-icons/bs'
import PropTypes from 'prop-types'

const ChatIcon = ({ handlerParent }: any) => {
    return (
        <BsChatFill
            className="chat-icon"
            size={50}
            color="#FFF"
            title="¿Hablamos?"
            viewBox="-1 0 18 17"
            strokeWidth={0.7}
            stroke="rgba(0,0,0,0.2)"
            onClick={handlerParent}
            fillOpacity={1}
        />
    )
}

const CloseIcon = ({ handlerParent }: any) => {
    return <BsX color="#000" title="close" size={30} onClick={handlerParent} />
}

ChatIcon.propTypes = {
    handlerParent: PropTypes.func,
}

CloseIcon.propTypes = {
    handlerParent: PropTypes.func,
}
export { ChatIcon, CloseIcon }

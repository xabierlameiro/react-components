import { Icon, Close } from "./styles";
import PropTypes from "prop-types";

const ChatIcon = ({ handlerParent }: any) => {
  return (
    <Icon
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
  );
};

const CloseIcon = ({ handlerParent }: any) => {
  return <Close color="#000" title="close" size={30} onClick={handlerParent} />;
};

ChatIcon.propTypes = {
  handlerParent: PropTypes.func,
};

CloseIcon.propTypes = {
  handlerParent: PropTypes.func,
};

export { ChatIcon, CloseIcon };

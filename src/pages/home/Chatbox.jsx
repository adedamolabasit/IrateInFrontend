import PropTypes from 'prop-types';


function Chatbox({ send, inBox }) {
 
  return (
    <div
      className={`bg-[#EAF9FE]  px-[0.52vw] py-[0.93vh]  w-auto ${
        send
          ? "self-start rounded-r-[0.5rem] rounded-bl-[0.5rem] "
          : "self-end rounded-l-[0.5rem] rounded-br-[0.5rem] "
      } flex flex-col mb-[1.57vh]  `}
    >
      <p className="text-[#4F4F4F] ">{inBox}</p>
      <small
        className={`text-[#828282] text-[0.5rem] ${
          send ? "self-start" : "self-end"
        }`}
      >
        12:03 PM
      </small>
    </div>
  );
}
Chatbox.propTypes = {
  send: PropTypes.node.isRequired,
  inBox: PropTypes.node.isRequired,
};
export default Chatbox;

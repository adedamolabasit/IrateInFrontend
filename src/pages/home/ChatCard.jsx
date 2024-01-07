import user from "../../assets/home/user.svg";
import PropTypes from "prop-types";

function ChatCard({ onClick, firstName, lastName, email, cursor }) {
  return (
    <div
      className={`${cursor} h-[10%] flex items-center justify-between w-full cursor-pointer  hover:bg-[#EAF9FE] py-2 px-2 overflow-y-scroll`}
      onClick={onClick}
    >
      <img src={user} alt="" className="h-full mr-[0.9375vw] " />
      <div className="text-[#4F4F4F] ">
        <h2 className="text-sm font-medium ">
          {firstName} {lastName}
        </h2>
        <p className="text-xs w-[15.38vw] truncate ">{email}</p>
      </div>
    </div>
    
  );
}
ChatCard.propTypes = {
  onClick: PropTypes.node.isRequired,
  firstName: PropTypes.node.isRequired,
  lastName: PropTypes.node.isRequired,
  email: PropTypes.node.isRequired,
  cursor: PropTypes.node.isRequired,
  diabaled: PropTypes.node.isRequired,
};
export default ChatCard;

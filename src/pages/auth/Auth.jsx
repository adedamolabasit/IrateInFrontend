import home from "../../assets/auth/home.svg";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

function Auth({ children }) {
  return (
    <div className="flex items-center justify-center flex-col pt-[7.4vh]  ">
      <Link to="/" className="mb-[4.53vh] flex items-end gap-2 ">
        <img src={home} alt="" className="w-[3.7vh]  " />
        <h1 className="text-[#0B468C] ">Home</h1>
      </Link>
      <div className="border border-[#E0E0E0] rounded-[0.5rem] py-[3.7vh] px-[2.5rem] w-[32.39vw] flex flex-col items-center ">
        {children}
      </div>
    </div>
  );
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Auth;

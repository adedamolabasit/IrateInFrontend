import { useFormik } from "formik";
import { UserValidation } from "./UserValidation";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  user_email: "",
  user_name: "",
};

function AddUser({ setShowAddUserModal }) {
  const { values, errors, handleChange, handleSubmit } = useFormik({
    validationSchema: UserValidation,
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Person has successfully been added");
    },
  });

  return (
    <div className="bg-white pt-[2.96vh] pb-[4.07vh] px-[1.67vw] rounded-[0.5rem] ">
      <h1 className="text-[#4F4F4F] mb-[2.41vh] text-xl ">Invite a Person</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-[2.22vh] w-[31.25rem] ">
          <label htmlFor="user_email" className=" text-sm text-[#4F4F4F]">
            Email Address
          </label>
          <input
            type="email"
            name="user_email"
            id="email"
            value={values.user_email}
            onChange={handleChange}
            placeholder="E.g john@gmail.com"
            className="bg-[#F8F8F8] py-[0.8vh] px-[1rem] outline-none border border-[#E0E0E0] rounded-[0.5rem] text-[#828282]"
          />
          {errors.user_email && <small>{errors.user_email}</small>}
        </div>
        <div className="flex flex-col mb-[2.22vh] w-[31.25rem] ">
          <label htmlFor="user_name" className="text-sm text-[#4F4F4F]">
            Name (Optional)
          </label>
          <input
            type="text"
            name="user_name"
            id="name"
            value={values.user_name}
            onChange={handleChange}
            placeholder="E.g john"
            className="bg-[#F8F8F8] py-[0.8vh] px-[1rem] outline-none border border-[#E0E0E0] rounded-[0.5rem] text-[#828282] "
          />
          {errors.user_name && <small>{errors.user_name}</small>}
        </div>
        <div className="w-full h-[2.5rem] flex items-center justify-between gap-4 mt-[2.5rem] ">
          <button
            className="w-full h-full border border-black/40 rounded-[0.5rem] hover:opacity-70 "
            onClick={() => setShowAddUserModal(false)}
            type="button"
          >
            Cancel
          </button>
          <button
            className="w-full h-full rounded-[0.5rem] bg-[#0B468C] text-white hover:bg-opacity-90 "
            type="submit"
          >
            Add person
          </button>
        </div>
      </form>
    </div>
  );
}

AddUser.propTypes = {
  setShowAddUserModal: PropTypes.node.isRequired,
};
export default AddUser;

import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../Slice/userSlice";
import axios from "axios";

function Navbar() {
  const user = useSelector((state) => state.user.User);
  const dispatch = useDispatch();

  const userLogout = async () => {
    await axios
      .post("/api/v1/users/logout")
      .then((res) => {
        dispatch(getUser(res.data.data));
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className=" flex h-20 p-4   justify-between md:px-14 md:py-6 md:h-24">
        {/* Name div */}

        <div className=" basis-40 text-center content-center text-xl font-semibold font-mono text-[#C7C7C7]">
          BLOG-WEBSITE
        </div>

        {/* navigation icons */}

        <div className=" basis-56 justify-evenly hidden md:flex">
          <div className=" text-center content-center text-sm font-medium font-mono text-[#C7C7C7] hover:underline hover:text-orange-400">
            <NavLink
              to="/"
              style={({ isActive }) => {
                return {
                  color: isActive && "orange",
                };
              }}
            >
              HOME
            </NavLink>
          </div>
          <div className=" text-center content-center text-sm font-medium font-mono text-[#C7C7C7] hover:underline hover:text-orange-400">
            {user ? (
              <NavLink
                to="/create"
                style={({ isActive }) => {
                  return {
                    color: isActive && "orange",
                  };
                }}
              >
                Create Post
              </NavLink>
            ) : (
              <NavLink
                to="/signin"
                style={({ isActive }) => {
                  return {
                    color: isActive && "orange",
                  };
                }}
              >
                SIGN IN
              </NavLink>
            )}
          </div>
          <div className=" text-center content-center text-sm font-medium font-mono text-[#C7C7C7] hover:underline hover:text-orange-400">
            {user ? (
              <button onClick={userLogout}>Logout {user.name}</button>
            ) : (
              <NavLink
                to="/signup"
                style={({ isActive }) => {
                  return {
                    color: isActive && "orange",
                  };
                }}
              >
                SIGN UP
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

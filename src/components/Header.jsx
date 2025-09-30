import React from "react";
import { GiSoccerBall } from "react-icons/gi";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { GiSoccerKick } from "react-icons/gi";
import { Dropdown, DropdownItem } from "flowbite-react";
function Header({ className = "", active }) {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(sessionStorage.getItem("existingUser"));
  const handleDashboard = () => {
    if (loggedIn.role == "user") {
      navigate("/userdashboard");
    } else {
      navigate("/organizerdashboard");
    }
  };
  const handleSignout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  console.log(active);
  return (
    <div className={className}>
      <Navbar fluid rounded className="!bg-gray-900 !h-22 ">
        <NavbarBrand className="!flex !items-center !justify-center ">
          {/* <img
            src="https://www.pngplay.com/wp-content/uploads/11/FIFA-Transparent-Image.png"
            className="!mr-0 !h-20 sm:h-9"
            alt="Flowbite React Logo"
          /> */}

          <span className="self-center !mx-0 whitespace-nowrap text-3xl  font-bold !flex !items-center dark:text-white">
            {/* <GiSoccerKick className="text-5xl text-white" /> */}
            Kick
            <GiSoccerBall />
            ff Meta
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          {loggedIn ? (
            <div className="flex items-center">
              <img
                className="h-[50px] w-[50px] rounded-full"
                src={
                  loggedIn.profilePic
                    ? `https://kickoffmeta-backend.onrender.com/uploads/${loggedIn.profilePic}`
                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                }
                alt=""
              />
              <Dropdown
                className="!bg-gray-900 p-0 !focus:outline-none focus:ring-0 cursor-pointer"
                dismissOnClick={false}
              >
                <DropdownItem onClick={handleDashboard}>Dashboard</DropdownItem>
                <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
              </Dropdown>
            </div>
          ) : (
            <Link to={"/register"}>
              <Button className="!bg-red-600">Get started!</Button>
            </Link>
          )}

          <NavbarToggle />
        </div>
        <div className="mt-0 md:mt-7 lg:mt-7">
          <NavbarCollapse className="!bg-gray-900">
            <Link to="/">
              <NavbarLink
                className="!text-lg bg-gray-900 cursor-pointer"
                active={active == 0}
              >
                Home
              </NavbarLink>
            </Link>

            <Link to="/competitions">
              {" "}
              <NavbarLink
                className="!text-lg  bg-gray-900 cursor-pointer"
                active={active == 1}
              >
                Competitions
              </NavbarLink>
            </Link>
            <Link to="/matchhub">
              {" "}
              <NavbarLink
                className="!text-lg  bg-gray-900 cursor-pointer"
                active={active == 4}
              >
                MatchHub
              </NavbarLink>
            </Link>

            <Link to="/about">
              {" "}
              <NavbarLink
                className="!text-lg  bg-gray-900 cursor-pointer"
                active={active == 2}
              >
                About
              </NavbarLink>
            </Link>

            <Link to="/contact">
              <NavbarLink
                className="!text-lg  bg-gray-900 cursor-pointer"
                active={active == 3}
              >
                Contact
              </NavbarLink>
            </Link>
          </NavbarCollapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;

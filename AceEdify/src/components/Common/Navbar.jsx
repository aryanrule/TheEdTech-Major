import React, { useEffect, useRef, useState } from "react";
import fileManager from "../../assets/assets";
import BtnG from "../Core/HomePage/BtnG";
import BtnW from "../Core/HomePage/BtnW";
import { Navlinks } from "../../data/Navlinks";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { categoriesEndPoints } from "../../services/api";
import { IoMdArrowDropdown } from "react-icons/io";
import DropdownItem from "../Core/HomePage/Nav/DropdownItem";
import { ApiConnector } from "../../services/apiConnector";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constant";
import ProfileDropdown from "../Core/HomePage/Nav/ProfileDropdown";



const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const dropDown = useRef(null);

  const matchroute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const response = await ApiConnector(
        "GET",
        categoriesEndPoints.CATEGORIES_API
      );
      setSubLinks(response.data.allTags);
      console.log(subLinks);
    } catch (error) {
      console.log("error occured while fetching the data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCategories();
    const handleClickOutside = (event) => {
      if (dropDown.current && !dropDown.current.contains(event.target)) {
        setIsOpen(false);
      } 
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };
  return (
    <div className="flex justify-between h-[10vh] bg-soft-gray w-[100vw] ">
      <Link to="/">
        <div className="flex justify-center items-center pt-2 pl-3 gap-2 mt-2">
          <img src={fileManager.coder} className="w-[40px] h-[40px]" />
          <h1 className=" font-extrabold  text-lg  ">AceEdify</h1>
        </div>
      </Link>

      {/* Navigating Links */}
      <div className="flex justify-center items-center text-center text cursor-pointer  gap-7">
        {Navlinks.map((link, index) => {
          return (
            <div key={index}>
              {link.title === "Catalog" ? (
                <div
                  ref={dropDown}
                  onKeyDown={handleKeyDown}
                  className="relative"
                >
                  <div
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className="flex items-center justify-center "
                  >
                    <h1 className="gradient-block inline-block relative py-1 hover-underline text-sm">
                      Catalog
                    </h1>
                    <IoMdArrowDropdown
                      className={`mt-1 transition-transform duration-200 ${
                        isOpen ? "tranform rotate-180" : ""
                      }`}
                    />

                    {isOpen && (
                      <div className="absolute right-0  translate-x-[60px]  translate-y-[90px]  w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {loading ? (
                          <p>Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks?.map((subLink, index) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                key={index}
                              >
                                <DropdownItem title={subLink.name} />
                              </Link>
                            ))}
                          </>
                        ) : (
                          <div className="text-center">
                            no courses available
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={link?.path}>
                  <h4
                    className={`${
                      matchroute(link?.path)
                        ? " font-bold "
                        : "gradient-block inline-block relative py-1 hover-underline text-sm"
                    }`}
                  >
                    {link.title}
                  </h4>
                </Link>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex item-center justify-center  mr-[25px] pr-8">
           {token === null ? (
            <div className="flex justify-center items-center gap-4 ">
              <Link to="/login">
               <BtnG text="login" />
             </Link>
             <Link to="/signUp">
               <BtnW text="signup" />
             </Link>
           </div>
           ) : (<div className= "flex justify-center items-center gap-4" >
                {
                  user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR ? 
                  (<div className="flex items-center justify-center  gap-3">
                    <img src={fileManager.cart} className="w-[30px] h-[30px]"/>
                    {/*  on thing is pending here which is how many items you have purchased */}
                    <ProfileDropdown/>
                  </div>) : (<div>
                     <ProfileDropdown/>
                  </div>)
                }
           </div>)
            
           }
      </div>

    </div>
  );
};

export default Navbar;

import React, { useState, useRef } from "react";
import "../style/InvoiceDetail.css";
import useMediaQuery from "../hooks/UseMediaQuery";
import menu from "/menu-icon.svg";
import decline from "/close-icon.svg";
import { useNavigate } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Link = ({
  page,
  selectedPage,
  setselectedPage,
  containerRef,
  sectionRefs,
  setIsContentVisible,
}) => {
  const spage = page.toLowerCase();
  return (
    <AnchorLink
      className={`${
        selectedPage === spage ? "text-yellow" : ""
      } hover:text-yellow transition duration-500`}
      href={`#${spage}`}
      onClick={() => {
        setselectedPage(spage);
      }}
    >
      {page}
    </AnchorLink>
  );
};
const NavHeader = ({
  TopOfPage,
  selectedPage,
  setselectedPage,
  sectionRefs,
  containerRef,
}) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [IsMenuToggled, setIsMenuToggled] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: "tab1", label: "Vendor Details", content: "Content for Tab 1" },
    { id: "tab2", label: "Invoice Details", content: "Content for Tab 2" },
    { id: "tab3", label: "Comments", content: "Content for Tab 3" },
  ];
  const isAboveSmallScreen = useMediaQuery("(min-width : 768px)");

  const handleBackClick = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("userSession");
    navigate("/");
        // alert("Back button clicked! Implement navigation here.");
  };

  return (
    <>
      {/* <nav className={`z-40 w-full fixed top-0 py-2`}> */}
      <div className="container top-0 fixed">
        <div className="header">
          <div className="img-container ml-[20px]">
            <img
              src="/Back Arrow.png"
              alt="Back"
              className="back-button-image opacity-100"
              onClick={handleBackClick}
            />
          </div>
          <h5 className="text-black text-[20px] font-bold mb-2 justify-start font-inter ml-1">
            Create New Invoice
          </h5>
        </div>
        {isAboveSmallScreen ? (
          <div className="tabs">
            <div className="flex">
            {tabs.map((tab,index) => (
              <div className="navtab" key={index}>
                <div
                  key={tab.id}
                  className={`tab ${
                    activeTab === tab.id ? "active" : ""
                  } font-inter`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setselectedPage(tab.label.toLowerCase());
                  }}
                >
                  <Link
                    page={tab.label}
                    selectedPage={selectedPage}
                    setselectedPage={setselectedPage}
                    containerRef={containerRef}
                    sectionRefs={sectionRefs}
                  />
                </div>
              </div>
            ))}
            </div>
            <div className="justify-items-end w-full">
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("formData");
                  localStorage.removeItem("userSession");
                  navigate("/");
                }}
                className="bg-white text-black px-4 py-1 mr-4 rounded flex w-[100px] max-w-[298px] justify-center place-content-center savebutton mt-2"
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <button
            className="rounded-full bg-blue-400 p-2 h-[46px]"
            onClick={() => setIsMenuToggled(!IsMenuToggled)}
          >
            <img alt="menu-icon" src={menu} />
          </button>
        )}
        {!isAboveSmallScreen && IsMenuToggled && (
          <div className="fixed right-0 bottom-0 h-full bg-blue-400 w-[300px] z-10">
            {/* Close Icon */}
            <div className="flex justify-end p-12">
              <button onClick={() => setIsMenuToggled(!IsMenuToggled)}>
                <img alt="close icon" src={decline} />
              </button>
            </div>
            {/* Menu Items */}
            <div className="flex flex-col gap-10 ml-[33%] text-2xl text-deep-blue">
              <Link
                page="Vendor Details"
                selectedPage={selectedPage}
                setselectedPage={setselectedPage}
              />
              <Link
                page="Invoice Details"
                selectedPage={selectedPage}
                setselectedPage={setselectedPage}
              />
              <Link
                page="Comments"
                selectedPage={selectedPage}
                setselectedPage={setselectedPage}
              />
              <button className="justify-start"
                onClick={() => {
                  localStorage.removeItem("formData");
                  localStorage.removeItem("userSession");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      {/* </nav> */}
    </>
  );
};

export default NavHeader;

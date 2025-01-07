import React, { useState, useRef } from "react";
import "../style/InvoiceDetail.css";
import useMediaQuery from "../hooks/useMediaQuery";
import menu from "/menu-icon.svg";
import decline from "/close-icon.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Link = ({
  page,
  selectedPage,
  setselectedPage,
  containerRef,
  sectionRefs,
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
        const container = containerRef.current;
        let target = "";
        if (page === "Vendor details") {
          target = sectionRefs.section1.current;
        } else if (page === "Invoice details") {
          target = sectionRefs.section2.current;
        } else {
          target = sectionRefs.section3.current;
        }

        if (container && target) {
          container.scrollTo({
            top: target.offsetTop - container.offsetTop, // Calculate the position within the container
            behavior: "smooth", // Smooth scrolling
          });
        }
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

  const tabs = [
    { id: "tab1", label: "Vendor Details", content: "Content for Tab 1" },
    { id: "tab2", label: "Invoice Details", content: "Content for Tab 2" },
    { id: "tab3", label: "Comments", content: "Content for Tab 3" },
  ];
  const isAboveSmallScreen = useMediaQuery("(min-width : 768px)");

  const handleBackClick = () => {
    alert("Back button clicked! Implement navigation here.");
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
              {tabs.map((tab) => (
                <div className="navtab">
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
              </div>
            </div>
          )}
        </div>
      {/* </nav> */}
    </>
  );
};

export default NavHeader;

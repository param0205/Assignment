import React, { useState, useRef } from "react";
import "../style/UploadDetails.css";
import VendorDetails from "./VendorDetails";
import useMediaQuery from "../hooks/UseMediaQuery";
import { useDropzone } from "react-dropzone";
import { Formik, Field, Form } from "formik";
import { toast, ToastContainer } from "react-toastify"; // Optional: for notifications

const UploadDetails = ({containerRef,sectionRefs,setIsContentVisible,isContentVisible}) => {
  const [fileData, setFileData] = useState(null);
  const [files, setFiles] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const [activeTab, setActiveTab] = useState("tab1");
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [formData, setFormData] = useState({
    // Fixed fields
    name: "",
    email: "",
    department: "",
    location: "",
    // Dynamic fields for tabs
    tab1Fields: {},
    tab2Fields: {},
    tab3Fields: {},
  });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) {
      toast.error("No file uploaded!");
      return;
    }
    parseFile(file);
    setFiles(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".txt,.csv,.json", // Acceptable file formats
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const parseFile = async (file) => {
    const reader = new FileReader();
    if (!["application/json", "text/csv"].includes(file.type)) {
      toast.error("Invalid file type. Only JSON and CSV are allowed.");
      return;
    }
    reader.onload = async () => {
      const content = reader.result;
      let Data = {};
      try {
        if (file.type === "application/json") {
          Data = await JSON.parse(content);
          setParsedData(Data);
          setFormData(parsedData);
        } else if (file.type === "text/csv") {
          const rows = content.split("\n").map((row) => row.split(","));
          const headers = rows[0];
          const values = rows[1];
          Data = headers.reduce((acc, header, index) => {
            acc[header.trim()] = values[index]?.trim();
            return acc;
          }, {});
        }
        toast.success("File parsed successfully!");
      } catch (error) {
        toast.error("Error parsing file content!");
      }
      setFileData({
        vendorName: Data.vendorName || "",
        invoiceDate: Data.invoiceDate || "",
        totalAmount: Data.totalAmount || "",
        currency: Data.currency || "",
        departments: Data.departments || "",
        locations: Data.locations || "",
        poNumbers: Data.poNumbers || "",
        invoiceNumber: Data.invoiceNumber || "",
        invoiceDueDate: Data.invoiceDueDate || "",
        glPostDate: Data.glPostDate || "",
        invoiceDescription: Data.invoiceDescription || "",
        paymentTerms: Data.paymentTerms || "",
        accounts: Data.accounts || "",
        lineAmount: Data.lineAmount || "",
      });
      console.log(fileData);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (Array.isArray(selectedFiles)) {
      setFiles(Array.from(selectedFiles));
    } else setFiles(selectedFiles);
    console.log("Files selected through input:", selectedFiles);
    parseFile(selectedFiles[0]);
  };
  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
    console.log("Uploaded files:", files);
    toast.success("Form submitted successfully!");
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;

      // Parse the content dynamically based on its structure
      let parsedData = {};

      if (file.type === "application/json") {
        // Parse JSON files
        try {
          parsedData = JSON.parse(content);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else if (file.type === "text/csv") {
        // Parse CSV files
        const rows = content.split("\n").map((row) => row.split(","));
        if (rows.length > 1) {
          const headers = rows[0];
          const values = rows[1];
          headers.forEach((header, index) => {
            parsedData[header.trim()] = values[index]?.trim();
          });
        }
      } else {
        // Parse plain text files (assume key-value pairs separated by ":")
        const lines = content.split("\n");
        lines.forEach((line) => {
          const [key, value] = line.split(":").map((str) => str.trim());
          if (key && value) {
            parsedData[key] = value;
          }
        });
      }

      // Update form values with parsed data
      setFileData({
        vendorName: parsedData.vendorName || "",
        invoiceDate: parsedData.invoiceDate || "",
        totalAmount: parsedData.totalAmount || "",
        currency: parsedData.currency || "",
        departments: parsedData.department || "",
        locations: parsedData.location || "",
        poNumbers: parsedData.poNumbers || "",
        invoiceNumber: parsedData.invoiceNumber || "",
        invoiceDueDate: parsedData.invoiceDueDate || "",
        glPostDate: parsedData.glPostDate || "",
        invoiceDescription: parsedData.invoiceDescription || "",
        paymentTerms: parsedData.paymentTerms || "",
        accounts: parsedData.accounts || "",
        lineAmount: parsedData.lineAmount || "",
      });
    };

    reader.readAsText(file);
  };

  const handleChange = (tab, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [tab]: {
        ...prevState[tab],
        [field]: value,
      },
    }));
  };

  const uploadGif =
    "https://s3-alpha-sig.figma.com/img/16b9/71b5/374d35591cf107df0cbf15334675279b?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HOm0N8kwEjYLyLRnohYhRbb0qDMDTqQcnmu~ixW~D-jucpU1XcGE80kbQhMEY~yW19mWjo7M3BVMa5qp3d67egt~2pl69GMy8tw3bWdM93GlLhPrN16sXCnmhiX5ixM0mq1Sm4yUhQly~8Q1Lyhrb8fq~7nSHyS1BtvXzCEMVtNjr4yocSfZe8IYxFbWLQOdwgTFp2Pwiwx-3PnuFb08ogmlz8P0RaYGsmnYLJwM9bRhd4roXMKMH9VTM6abI7DxqLML21I8Yz~wS~XejsRKjnYMUrfZzYmn~ZMfXihVc5GWuc2BaGhmj-52F6iHdL6HC-8tqW7HyQ146hLhL62Gbw__";

  return (
    <div className="containerUpload md:order-2 basis-3/6 mt-[80px]">
      {/* Left Section */}
      {isAboveMediumScreens ? (
        <>
          <div className="left-section z-10 w-1/2 ml-[20px]">
            <Formik
              initialValues={{
                department: null,
                date: "",
                description: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form className="w-full">
                  <div className="w-full place-content-center h-full">
                    <div
                      {...getRootProps()}
                      className="justify-items-center place-content-center"
                    >
                      <input {...getInputProps()} className="h-full w-full" />
                      <p className="text-1xl font-semibold text-black">
                        Upload Your Invoice
                      </p>
                      <p className="text-black">
                        To auto-populate fields and save time
                      </p>
                      <img
                        className="img-layout"
                        src={uploadGif}
                        alt="Upload animation"
                      />
                      <label htmlFor="fileInput" className="upload-label">
                        Upload File
                        <img
                          src="/Icon.png"
                          alt="arrow"
                          className="icon-layout"
                        />
                      </label>
                      <p className="text-blue-400 text-1xl font-semibold mt-2">
                        Click to upload{" "}
                        <span className="text-slate-400 font-light">
                          or Drag and drop
                        </span>
                      </p>
                    </div>
                    {/* <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="fileInput"
                  /> */}
                    <ToastContainer />
                    {fileData && (
                      <div className="file-info">
                        <p>Uploaded File: {fileData.name}</p>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* <div className="right-section w-1/2">
            <VendorDetails fileData={fileData} setFileData={setFileData} />
          </div> */}
        </>
      ) : (
        <>
          <div
            className="left-section w-full
              max-w-[-400px] md:max-w-[600px]"
          >
            <Formik
              initialValues={{
                department: null,
                date: "",
                description: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values }) => (
                <Form className="w-full">
                  <div className="w-full place-content-center">
                    <div
                      {...getRootProps()}
                      className="justify-items-center place-content-center "
                    >
                      <input {...getInputProps()} className="h-full w-full" />
                      <p className="text-1xl font-semibold text-black">
                        Upload Your Invoice
                      </p>
                      <p className="text-black">
                        To auto-populate fields and save time
                      </p>
                      <img
                        className="img-layout"
                        src={uploadGif}
                        alt="Upload animation"
                      />
                      <label htmlFor="fileInput" className="upload-label">
                        Upload File
                        <img
                          src="/Icon.png"
                          alt="arrow"
                          className="icon-layout"
                        />
                      </label>
                      <p className="text-blue-400 text-1xl font-semibold mt-2">
                        Click to upload{" "}
                        <span className="text-slate-400 font-light">
                          or Drag and drop
                        </span>
                      </p>
                    </div>
                    {/* <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="fileInput"
                  /> */}
                    <ToastContainer />
                    {fileData && (
                      <div className="file-info">
                        <p>Uploaded File: {fileData.name}</p>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* <div className="right-section w-full">
            <VendorDetails fileData={fileData} setFileData={setFileData} />
          </div> */}
        </>
      )}

      {/* Right Section */}
      <div className="right-section w-1/2">
        <VendorDetails fileData={fileData} setFileData={setFileData} sectionRefs ={sectionRefs} containerRef={containerRef} setIsContentVisible={setIsContentVisible} isContentVisible={isContentVisible} />
      </div>
    </div>
  );
};

export default UploadDetails;

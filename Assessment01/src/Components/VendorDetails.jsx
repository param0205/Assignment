import React, { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import "../style/VendorDetails.css";
import { useState } from "react";
import {
  currencyOptions,
  VendorList,
  poNumbers,
  invoiceNumbers,
  paymentTerms,
  accounts,
  departments,
  locations,
  validationSchema,
} from "./InputDetails";

const VendorDetails = ({
  fileData,
  setFileData,
  sectionRefs,
  containerRef,
}) => {
  // Load saved data from localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem("formData");
    if (savedForm && savedForm !== "undefined") {
      setFileData(JSON.parse(savedForm));
      console.log(fileData);
    }
  }, []);

  // Save form state to localStorage
  const saveFormToLocalStorage = (values) => {
    localStorage.setItem("formData", JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={
        fileData || {
          vendorName: "",
          invoiceDate: "",
          totalAmount: "",
          currency: "",
          departments: "",
          locations: "",
          poNumbers: "",
          invoiceNumber: "",
          accounts: "",
          invoiceDueDate: "",
          glPostDate: "",
          paymentTerms: "",
          lineAmount: "",
          comment: "",
          expDecription: "",
          invoiceDescription: "",
          vendorDesc: "",
        }
      }
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(values, { resetForm, setFieldValue }) => {
        console.log("Form submitted:", values);
        localStorage.removeItem("formData");
        resetForm();
        setFileData(null);
        alert("Form submitted successfully!");
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        resetForm,
        validateForm,
        setTouched,
      }) => (
        <div className="flex flex-col" ref={containerRef}>
          {/* Scrollable Content */}
          <Form className="flex-1 overflow-y-auto p-4 h-full mb-10">
            {/* Section 1: Vendor Information */}
            <section id="vendor details" ref={sectionRefs.section1}>
              <div className="mb-8">
                <div className="lg:w-full h-[56px] flex flex-row">
                  <div className="flex h-[56px] w-[56px] p-4 gap-1 rounded-full  bg-blue-50">
                    <img
                      alt="Vendor"
                      src="/Vendor.png"
                      className="h-[24px] w-[24px]"
                    ></img>
                  </div>
                  <div className="ml-6 place-content-center">
                    <h5 class="font-inter text-[24px] font-semibold leading-[32px] tracking-[-0.02em] text-left underline decoration-skip-ink-none text-black">
                      Vendor Details
                    </h5>{" "}
                  </div>
                </div>
                <div className="mb-4 mt-6">
                  <p className="text-black text-[20px] font-bold mb-2 justify-start font-inter">
                    Vendor Information
                  </p>
                  <label
                    htmlFor="vendorName"
                    className="text-slate-400 text-[16px] justify-start font-inter"
                    required
                  >
                    Vendor <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={VendorList}
                    name="vendorName"
                    placeholder="Select Vendor"
                    className="w-full border border-black rounded-[8px]"
                    value={
                      VendorList.find(
                        (option) => option.value === values.vendorName
                      ) || ""
                    }
                    onChange={(option) => {
                      setFieldValue("vendorName", option.value);
                      setFieldValue("vendorDesc", option.desc);
                    }}
                  />
                  {/* </div> */}
                  {errors.vendorName && touched.vendorName && (
                    <p className="text-red-500 text-sm">{errors.vendorName}</p>
                  )}
                  <p className="text-slate-400 font-light mt-2">
                    {" "}
                    {values.vendorDesc}
                  </p>
                  <div className="justify-items-center">
                    <p className="text-blue-400 text-1xl font-light mt-2">
                      View Vendor Details
                    </p>{" "}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Invoice Details */}
            <section
              className="lg:w-full"
              id="invoice details"
              ref={sectionRefs.section2}
            >
              <div className="mb-8">
                <div className="lg:w-full h-[56px] flex flex-row">
                  <div className="flex h-[56px] w-[56px] p-4 gap-1 rounded-full  bg-blue-50">
                    <img
                      alt="Vendor"
                      src="/Invoice.png"
                      className="h-[24px] w-[24px]"
                    ></img>
                  </div>
                  <div className="ml-6 place-content-center">
                    <h5 class="font-inter text-[24px] font-semibold leading-[32px] tracking-[-0.02em] text-left underline decoration-skip-ink-none text-black">
                      Invoice Details
                    </h5>{" "}
                  </div>
                </div>
                <div className="mb-4 mt-6">
                  <p className="text-black text-[20px] font-bold mb-2 justify-start font-inter">
                    General Information
                  </p>
                  <label
                    htmlFor="poNumbers"
                    className="text-slate-400 text-[16px] justify-start font-inter"
                    required
                  >
                    Purchase Order Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={poNumbers}
                    name="poNumbers"
                    placeholder="Select Purchase Order"
                    className="w-full border border-black rounded-[8px]"
                    value={
                      poNumbers.find(
                        (option) => option.value === values.poNumbers
                      ) || ""
                    }
                    onChange={(option) =>
                      setFieldValue("poNumbers", option.value)
                    }
                  />
                  {errors.poNumbers && touched.poNumbers && (
                    <p className="text-red-500 text-sm">{errors.poNumbers}</p>
                  )}
                </div>
                <div>
                  <p className="text-black text-[20px] font-bold mb-2 justify-start font-inter mt-6">
                    Invoice Details
                  </p>
                  <div className="mb-4 md:flex md:justify-between mt-6 ">
                    <div className="md:w-1/2 mr-6">
                      <label
                        htmlFor="invoiceNumber"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Invoice Number <span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={invoiceNumbers}
                        name="invoiceNumber"
                        placeholder="Select Invoice"
                        className="w-full border border-black rounded-[8px]"
                        value={
                          invoiceNumbers.find(
                            (option) => option.value === values.invoiceNumber
                          ) || ""
                        }
                        onChange={(option) =>
                          setFieldValue("invoiceNumber", option.value)
                        }
                      />
                      {errors.invoiceNumber && touched.invoiceNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.invoiceNumber}
                        </p>
                      )}
                    </div>
                    <div className="md:w-1/2">
                      <label
                        htmlFor="invoiceDate"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Invoice Date<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="date"
                        placeholder="MM/DD/YYYY"
                        id="invoiceDate"
                        name="invoiceDate"
                        className="border p-2 w-full border-black rounded-[8px] Payment"
                      />
                      {errors.invoiceDate && touched.invoiceDate && (
                        <p className="text-red-500 text-sm">
                          {errors.invoiceDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 md:flex md:justify-between mt-6 ">
                    <div className="md:w-1/2 mr-6">
                      <label
                        htmlFor="totalAmount"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Total Amount<span className="text-red-500">*</span>
                      </label>
                      <div className="relative w-full">
                        <Field
                          name="totalAmount"
                          type="number"
                          className="border border-black rounded-md px-4 py-2 w-full"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          USD
                        </span>
                      </div>
                      {errors.totalAmount && touched.totalAmount && (
                        <p className="text-red-500 text-sm">
                          {errors.totalAmount}
                        </p>
                      )}
                    </div>
                    <div className="md:w-1/2">
                      <label
                        htmlFor="paymentTerms"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Payment Terms<span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={paymentTerms}
                        name="paymentTerms"
                        placeholder="Select"
                        className="w-full border border-black rounded-[8px]"
                        value={
                          paymentTerms.find(
                            (option) => option.value === values.paymentTerms
                          ) || ""
                        }
                        onChange={(option) =>
                          setFieldValue("paymentTerms", option.value)
                        }
                      />
                      {errors.paymentTerms && touched.paymentTerms && (
                        <p className="text-red-500 text-sm">
                          {errors.paymentTerms}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 md:flex md:justify-between mt-6 ">
                    <div className="md:w-1/2 mr-6">
                      <label
                        htmlFor="invoiceDueDate"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Invoice Due Date<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="date"
                        id="invoiceDueDate"
                        name="invoiceDueDate"
                        placeholder="MM/DD/YYYY"
                        className="border p-2 w-full border-black rounded-[8px]"
                      />
                      {errors.invoiceDueDate && touched.invoiceDueDate && (
                        <p className="text-red-500 text-sm">
                          {errors.invoiceDueDate}
                        </p>
                      )}
                    </div>
                    <div className="md:w-1/2">
                      <label
                        htmlFor="glPostDate"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        GL Post Date<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="date"
                        id="glPostDate"
                        name="glPostDate"
                        placeholder="MM/DD/YYYY"
                        className="border p-2 w-full border-black rounded-[8px]"
                      />
                      {errors.glPostDate && touched.glPostDate && (
                        <p className="text-red-500 text-sm">
                          {errors.glPostDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="invoiceDescription"
                      className="text-slate-400 text-[16px] justify-start font-inter"
                      required
                    >
                      Invoice Description<span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      id="invoiceDescription"
                      name="invoiceDescription"
                      placeholder="Invoice Description"
                      className="flex w-full h-[40px] border border-black rounded-[8px]"
                    ></Field>
                    {errors.invoiceDescription &&
                      touched.invoiceDescription && (
                        <p className="text-red-500 text-sm">
                          {errors.invoiceDescription}
                        </p>
                      )}
                  </div>
                </div>
                <div>
                  <p className="text-black text-[20px] font-bold mb-2 justify-start font-inter mt-6">
                    Expense Details<span className="text-red-500">*</span>
                  </p>
                  <div className="mb-4 md:flex md:justify-between mt-6 ">
                    <div className="md:w-1/2 mr-6">
                      <label
                        htmlFor="lineAmount"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Line Amount<span className="text-red-500">*</span>
                      </label>
                      <div className="relative w-full">
                        <Field
                          name="lineAmount"
                          type="text"
                          className="border border-black rounded-md px-4 py-2 w-full"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          USD
                        </span>
                      </div>
                      {errors.lineAmount && touched.lineAmount && (
                        <p className="text-red-500 text-sm">
                          {errors.lineAmount}
                        </p>
                      )}
                    </div>
                    <div className="md:w-1/2">
                      <label
                        htmlFor="departments"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Department<span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={departments}
                        name="departments"
                        placeholder="Select Department"
                        className="w-full border border-black rounded-[8px]"
                        value={
                          departments.find(
                            (option) => option.value === values.departments
                          ) || ""
                        }
                        onChange={(option) =>
                          setFieldValue("departments", option.value)
                        }
                      />{" "}
                      {errors.departments && touched.departments && (
                        <p className="text-red-500 text-sm">
                          {errors.departments}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 md:flex md:justify-between mt-6 ">
                    <div className="md:w-1/2 mr-6">
                      <label
                        htmlFor="Account"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Account<span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={accounts}
                        name="accounts"
                        placeholder="Select Account"
                        className="w-full border border-black rounded-[8px]"
                        value={
                          accounts.find(
                            (option) => option.value === values.accounts
                          ) || ""
                        }
                        onChange={(option) =>
                          setFieldValue("accounts", option.value)
                        }
                      />
                      {errors.accounts && touched.accounts && (
                        <p className="text-red-500 text-sm">
                          {errors.accounts}
                        </p>
                      )}
                    </div>
                    <div className="md:w-1/2">
                      <label
                        htmlFor="locations"
                        className="text-slate-400 text-[16px] justify-start font-inter"
                      >
                        Location<span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={locations}
                        name="locations"
                        placeholder="Select Location"
                        className="w-full border border-black rounded-[8px]"
                        value={
                          locations.find(
                            (option) => option.value === values.locations
                          ) || ""
                        }
                        onChange={(option) =>
                          setFieldValue("locations", option.value)
                        }
                      />{" "}
                      {errors.locations && touched.locations && (
                        <p className="text-red-500 text-sm">
                          {errors.locations}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="expDecription"
                      className="text-slate-400 text-[16px] justify-start font-inter"
                      required
                    >
                      Description
                    </label>
                    <Field
                      type="text"
                      id="expDecription"
                      name="expDecription"
                      className="flex w-full h-[40px] border border-black rounded-[8px]"
                    ></Field>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Expense Details */}
            <section
              id="comments"
              className="lg:w-full"
              ref={sectionRefs.section3}
            >
              <div className="mb-12">
                <div className="lg:w-full h-[56px] flex flex-row">
                  <div className="flex h-[56px] w-[56px] p-4 gap-1 rounded-full  bg-blue-50">
                    <img
                      alt="Vendor"
                      src="/Comment.png"
                      className="h-[24px] w-[24px]"
                    ></img>
                  </div>
                  <div className="ml-6 place-content-center">
                    <h5 class="font-inter text-[24px] font-semibold leading-[32px] tracking-[-0.02em] text-left underline decoration-skip-ink-none text-black">
                      Comments
                    </h5>{" "}
                  </div>
                </div>
                <div className="mb-4 mt-6">
                  <div>
                    <Field
                      type="text"
                      id="comment"
                      name="comment"
                      placeholder="Add a comment and use @Name to tag someone"
                      className="flex w-full h-[40px] border border-black rounded-[8px]"
                    ></Field>
                  </div>
                </div>
              </div>
            </section>
            <div className="bg-white border-t p-4 flex justify-end fixed bottom-0  w-1/2 right-0">
              <div className="w-[48px] h-[48px]">
                <img src="/Icon Button.png" alt="Icon Button"></img>
              </div>
              <button
                type="button"
                onClick={() => {
                  saveFormToLocalStorage(values);
                  alert("Draft Saved!");
                }}
                className="bg-white text-black px-4 py-2 mr-4 rounded flex w-[220px] max-w-[298px] justify-center place-content-center border-4 border-black-800"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded flex w-[228px] max-w-[298px] justify-center place-content-center"
              >
                Submit
              </button>
            </div>
          </Form>
          {/* Fixed Footer */}
        </div>
      )}
    </Formik>
  );
};

export default VendorDetails;

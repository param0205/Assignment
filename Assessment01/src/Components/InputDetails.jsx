import * as Yup from "yup";

export const VendorList = [
  { value: "A-1Exterminator", label: "A-1Exterminator", desc:"Description1" },
  { value: "A-2Exterminator", label: "A-2Exterminator", desc:"Description2" },
  { value: "A-3Exterminator", label: "A-3Exterminator", desc:"Description3" },
  { value: "A-4Exterminator", label: "A-4Exterminator", desc:"Description4" },
  { value: "A-5Exterminator", label: "A-5Exterminator", desc:"Description5" },
];

export const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "INR", label: "INR" },
];
export const poNumbers = [
  { label: "PO Number 1", value: "PO123456" },
  { label: "PO Number 2", value: "PO234567" },
  { label: "PO Number 3", value: "PO345678" },
  { label: "PO Number 4", value: "PO456789" },
  { label: "PO Number 5", value: "PO567890" },
];
export const invoiceNumbers = [
  { label: "Invoice Number 1", value: "INV123456" },
  { label: "Invoice Number 2", value: "INV234567" },
  { label: "Invoice Number 3", value: "INV345678" },
  { label: "Invoice Number 4", value: "INV456789" },
  { label: "Invoice Number 5", value: "INV567890" },
];
export const paymentTerms = [
  { label: "Net 30 Days", value: "NET30" },
  { label: "Net 60 Days", value: "NET60" },
  { label: "Net 90 Days", value: "NET90" },
  { label: "Due on Receipt", value: "DUE_ON_RECEIPT" },
  { label: "COD (Cash on Delivery)", value: "COD" },
];
export const locations = [
  { label: "New York", value: "NY" },
  { label: "Los Angeles", value: "LA" },
  { label: "Chicago", value: "CHICAGO" },
  { label: "San Francisco", value: "SF" },
  { label: "Miami", value: "MIAMI" },
];
export const departments = [
  { label: "Sales", value: "SALES" },
  { label: "Finance", value: "FINANCE" },
  { label: "Human Resources", value: "HR" },
  { label: "IT", value: "IT" },
  { label: "Marketing", value: "MARKETING" },
];
export const accounts = [
    { label: 'Account 1', value: 'ACC12345' },
    { label: 'Account 2', value: 'ACC23456' },
    { label: 'Account 3', value: 'ACC34567' },
    { label: 'Account 4', value: 'ACC45678' },
    { label: 'Account 5', value: 'ACC56789' }
  ];

export const validationSchema = Yup.object({
  vendorName: Yup.string().required("Vendor Name is required"),
  invoiceDate: Yup.date()
    .required("Invoice Date is required")
    .typeError("Invalid date format, please enter a valid date")
    .nullable(),
  invoiceDueDate: Yup.date()
    .required("Invoice Date is required")
    .typeError("Invalid date format, please enter a valid date")
    .nullable(),
  totalAmount: Yup.number()
    .required("Total Amount is required")
    .positive("Total Amount must be positive"),
  lineAmount: Yup.number()
    .required("Line Amount is required")
    .positive("Line Amount must be positive"),
  departments: Yup.string().required("Department is required"),
  accounts: Yup.string().required("Account number is required"),
  locations: Yup.string().required("Location is required"),
  poNumbers: Yup.string().required("PO Number is required"),
  invoiceNumber: Yup.string().required("Invoice Number is required"),
  glPostDate: Yup.string()
    .required("GL Post date is required")
    .typeError("Invalid date format, please enter a valid date")
    .nullable(),
  paymentTerms: Yup.string().required("Payment Term is required"),
});  
  

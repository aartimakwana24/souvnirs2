import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import Swal from "sweetalert2";
import { useState } from "react";

// export const debouncedShowToast = debounce(showToast, 200);

export const getStatusStyles = (status) => {
  switch (status) {
    case "ACTIVE":
      return (
        <div className="badge bg-primary text-white font-weight-bold">
          <span>ACTIVE</span>
        </div>
      );

    case "PENDING":
      return (
        <div className="badge bg-secondary text-white font-weight-bold">
          <span>PENDING</span>
        </div>
      );

    default:
      return (
        <div className="badge bg-danger text-white font-weight-bold">
          <span>DEACTIVE</span>
        </div>
      );
  }
};

export const getStockStatusStyles = (stockStatus) => {
  switch (stockStatus) {
    case "IN_STOCK":
      return <div className="text-primary">IN STOCK</div>;

    case "OUT_OF_STOCK":
      return <div className="text-error">OUT OF STOCK</div>;

    default:
      return <div className="text-secondary">BACK ORDER</div>;
  }
};

export const showToast = (message, type) => {
  toast(message, {
    type, 
    autoClose: 1500,
    className: "sticky top-10 right-10",
    theme: "dark",
  });
};

export const debouncedShowToast = debounce(showToast, 200);

export const sortProductsByName = (products, sortOrder) => {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    const nameA = a?.name;
    const nameB = b?.name;
    if (sortOrder === "ascending") {
      return nameA.localeCompare(nameB);
    } else if (sortOrder === "descending") {
      return nameB.localeCompare(nameA);
    } else {
      throw new Error(
        "Invalid sortOrder parameter. Use 'ascending' or 'descending'."
      );
    }
  });

  return sortedProducts;
};

export default function success(title, msg) {
  Swal.fire({
    title: title,
    text: msg,
    icon: "success",
  }).then(function (result) {});
}

export const swalError = (title, msg, onClose) => {
  Swal.fire({
    title: title,
    text: msg,
    icon: "error",
  }).then(function (result) {
    if (onClose()) {
      if (result.isConfirmed) {
        onClose();
      }
    }
  });
};

export const useFormValidation = (formData, activeTabId) => {
  console.log("activeTabId ", activeTabId);
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value, regex) => {
    if (!regex.test(value.trim())) {
      return `Invalid ${name}. Numeric value expected.`;
    }
    return "";
  };

  const validateImageUpload = (name, value) => {
    if (!value || value.length === 0) {
      return `At least one image is required for ${name}.`;
    }
    return "";
  };

  const validateNotEmpty = (name, value) => {
    if (!value || !value.trim()) {
      return `${name} is required.`;
    }
    return "";
  };

  const getDataFromSessionStorage = (activeTabId) => {
    const sessionData = sessionStorage.getItem(`formData${activeTabId}`);
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    return null;
  };

  const validateFormData = (formData) => {
    const { price, quantity, readyToShip, freeShipping, status, sku } =
      formData;
    if (
      !price ||
      !quantity ||
      !readyToShip ||
      !freeShipping ||
      !status ||
      !sku
    ) {
      return false;
    }
    return true;
  };

  const mergeFormData = (formData, parsedData) => {
    const mergedData = { ...formData };

    if (parsedData) {
      mergedData.price = formData.price || parsedData.price || "";
      mergedData.quantity = formData.quantity || parsedData.quantity || "";
      mergedData.readyToShip =
        formData.readyToShip || parsedData.readyToShip || "";
      mergedData.freeShipping =
        formData.freeShipping || parsedData.freeShipping || "";
      mergedData.status = formData.status || parsedData.status || "";
      mergedData.sku = formData.sku || parsedData.sku || "";
      mergedData.publish = formData.publish || "";
    }

    return mergedData;
  };

  const validateForm = () => {
    const errors = {};

    const validations = {
      quantity: { validator: validateField, regex: /^\d+$/ },
      price: { validator: validateField, regex: /^\d+$/ },
      sku: { validator: validateNotEmpty },
      status: { validator: validateNotEmpty },
      readyToShip: { validator: validateNotEmpty },
      freeShipping: { validator: validateNotEmpty },
    };

    let parsedData = getDataFromSessionStorage(activeTabId);
    const mergedData = mergeFormData(formData, parsedData);

    Object.keys(validations).forEach((key) => {
      const { validator, regex } = validations[key];
      const value = mergedData[key] || "";
      const error = validator(key, value, regex);
      if (error) {
        errors[key] = error;
      }
    });

    const imageError = validateImageUpload("images", formData.img || []);
    if (imageError) {
      errors.images = imageError;
    }

    setValidationErrors(errors);

    const isFormDataValid = validateFormData(mergedData);

    return Object.keys(errors).length === 0 && isFormDataValid;
  };

  return {
    validationErrors,
    validateField,
    validateNotEmpty,
    validateImageUpload,
    validateForm,
  };
};

export const useTableDataValidation = (tableData) => {
  const [tableValidationErrors, setTableValidationErrors] = useState([]);

  const validateTableData = () => {
    const errors = tableData.map((row) => {
      const rowErrors = {};
      if (!row.price || !/^\d+$/.test(row.price.trim())) {
        rowErrors.price = "Invalid price. Numeric value expected.";
      }
      if (!row.minQuantity || !/^\d+$/.test(row.minQuantity.trim())) {
        rowErrors.minQuantity = "Invalid min quantity. Numeric value expected.";
      }
      if (!row.currency || !row.currency.trim()) {
        rowErrors.currency = "Currency is required.";
      }
      return rowErrors;
    });
    setTableValidationErrors(errors);
    return errors.every((error) => Object.keys(error).length === 0);
  };

  return {
    tableValidationErrors,
    validateTableData,
  };
};

export const usePublishValidation = (tableData) => {
  const [publishValidationErrors, setPublishValidationErrors] = useState("");

  const validatePublish = () => {
    if (tableData.length === 0) {
      setPublishValidationErrors(
        "At least one row with valid data is required."
      );
      return false;
    }
    const isValid = tableData.some((row) => {
      return (
        /^\d+$/.test(row.price.trim()) &&
        /^\d+$/.test(row.minQuantity.trim()) &&
        row.currency.trim()
      );
    });
    if (!isValid) {
      setPublishValidationErrors(
        "At least one row with valid data is required."
      );
    } else {
      setPublishValidationErrors("");
    }
    return isValid;
  };

  return {
    publishValidationErrors,
    validatePublish,
  };
};

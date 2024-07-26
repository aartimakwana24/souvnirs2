import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BsUpload } from "react-icons/bs";
import { swalError } from "../../../utils";

const Dropzone = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const nonPngFiles = acceptedFiles.filter(
        (file) => !file.type.startsWith("image/png")
      );

      if (nonPngFiles.length > 0) {
        setShowModal(true);
      } else {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        onFilesChange([...files, ...acceptedFiles]);
      }
    },
    [files, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/png",
  });

  return (
    <div className="h-30" {...getRootProps()}>
      <input accept="image/png" {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image files here ...</p>
      ) : (
        <div className="flex flex-1 items-center justify-center flex-col h-full">
          <div className="flex justify-center items-center flex-col">
            <p className="p-3 text-center">
              Drag & drop some image files here, Only PNG files are allowed.
              Please remove non-PNG files
            </p>
            <div className="py-3 rounded d-flex justify-content-center">
              <BsUpload size={40} />
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {swalError(
              "Error",
              "Only PNG files are allowed Please remove non-PNG files",
              () => setShowModal(false)
            )}
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;


// souvinrs2
// |
// |
// |
// souvinrs2/client/pages/admin/AddVarients/index.js      and dropzone have in  souvinrs2/client/components/ui/Dropzone/index.js 
// souvinrs2/server/middlewares/uploads
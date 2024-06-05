"use client";

import { LordIcon } from "@/components/LordIcon";
import TableComponent from "@/components/Table";
import { useCsvData } from "@/context/CsvContext";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function MainContent() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ documents?: string }>({});
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const { uploadCsv } = useCsvData();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
    setIsDragOver(false);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)
    ) {
      closeModal();
    }
  };

  const processFiles = (newFiles: File[]) => {
    setFileNames(newFiles.map((file) => file.name));
    setFiles(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFileNames([]);
    setFiles([]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setErrors({ documents: "Select a CSV document" });
      toast.error("No documents selected");
      return;
    }

    setIsFetching(true);
    try {
      for (const file of files) {
        await uploadCsv(file);
      }
      setFiles([]);
    } catch (error: any) {
      setErrors({ documents: error.message });
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsFetching(false);
      closeModal();
    }
  };

  return (
    <div>
      <TableComponent openModal={openModal} />

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleOutsideClick}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className="relative sm:top-12 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              ref={modalContentRef}
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Add new CSV
                  </h3>
                  <div className="mt-6"></div>
                  <div className="mt-3 flex justify-start"></div>
                  <div className="mt-6">
                    <div className="mt-6">
                      <div className="mt-2 sm:col-span-3">
                        <label className="block mb-2 text-sm font-medium leading-6 text-primary">
                          Insert your documents below
                        </label>
                        <div
                          className={`flex max-w-2xl justify-center rounded-lg border ${
                            errors.documents
                              ? "border-red-600"
                              : isDragOver
                              ? "border-blue-500 border-dashed"
                              : "border-dashed border-gray-900/25"
                          } px-6 py-10`}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onDragEnter={() => setIsDragOver(true)}
                          onDragLeave={() => setIsDragOver(false)}
                        >
                          <div className="text-center">
                            <LordIcon
                              src="https://cdn.lordicon.com/rqquljny.json"
                              trigger="loop"
                              colors={{
                                primary: "#1e21c9",
                                secondary: "#1e21c9",
                              }}
                              size={80}
                            />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className={`relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 ${
                                  errors.documents
                                    ? "text-red-600"
                                    : "hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                                }`}
                              >
                                <span>
                                  {fileNames.length === 0 ? (
                                    <span className="text-primary">
                                      Click here to add your documents
                                    </span>
                                  ) : (
                                    <span>
                                      Added files: {fileNames.join(", ")}
                                    </span>
                                  )}
                                </span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept=".csv"
                                  multiple
                                  onChange={handleFileChange}
                                />
                              </label>
                              {fileNames.length === 0 && (
                                <p className="pl-1">or drag it here.</p>
                              )}
                            </div>
                            {errors.documents && (
                              <p className="text-red-600 text-sm">
                                {errors.documents}
                              </p>
                            )}
                            <p className="text-xs leading-5 text-gray-600">
                              Only <strong>.csv</strong> files allowed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  disabled={isFetching}
                  onClick={handleUpload}
                >
                  {isFetching ? "Sending..." : "Add"}
                </button>
              </div>
              <div className="mt-3 sm:mt-3">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

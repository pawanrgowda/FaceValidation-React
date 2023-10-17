import React, { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { DropZone } from "./drop-zone";
import styles from "./file-picker.module.css";
import { FilesList } from "./files-list";

const FilePicker = ({ accept }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [base64Images, setBase64Images] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);

  const handleOnChange = useCallback(async (selectedFiles) => {
    let newFiles = Array.from(selectedFiles).slice(0, 2);

    newFiles = await Promise.all(
      newFiles.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          id: nanoid(),
          file,
          base64,
        };
      })
    );

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setProgress(0);
    setUploadStarted(false);
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleClearFile = useCallback((id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const canShowProgress = useMemo(() => files.length > 0, [files.length]);

  const handleSaveLocally = useCallback(() => {
    try {
      const localImageUrls = files.map((file) => ({
        id: file.id,
        url: URL.createObjectURL(file.file),
      }));

      setBase64Images(localImageUrls);
      window.parent.postMessage({ type: "base64Images", data: localImageUrls }, "*");

      setProgress(100);
      setUploadStarted(false);
    } catch (error) {
      console.error("Error saving images locally:", error);
    }
  }, [files]);

  useEffect(() => {
    if (files.length < 1) {
      setProgress(0);
    }
  }, [files.length]);

  useEffect(() => {
    if (progress === 100) {
      setUploadStarted(false);
    }
  }, [progress]);

  const uploadComplete = useMemo(() => progress === 100, [progress]);

  const handleMessage = (event) => {
    if (event.data && event.data.type === "apiResponse") {
      const responseData = event.data.responseData;
      setApiResponse(responseData);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.canvas_wrapper}>
        <DropZone onChange={handleOnChange} accept={accept} />
      </div>

      {files.length ? (
        <div className={styles.files_list_wrapper}>
          <FilesList
            files={files}
            onClear={handleClearFile}
            uploadComplete={uploadComplete}
          />
        </div>
      ) : null}

      {canShowProgress ? (
        <div className={styles.files_list_progress_wrapper}>
          <progress value={progress} max={100} style={{ width: "100%" }} />
        </div>
      ) : null}

      {files.length ? (
        <button
          onClick={handleSaveLocally}
          className={styles.upload_button}
          disabled={uploadComplete || uploadStarted}
        >
          Upload File
        </button>
      ) : null}

      {base64Images.length > 0 && (
        <div className={styles.base64_images}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Base64 Images:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {base64Images.map((image) => (
              <li key={image.id} style={{ marginBottom: "1rem" }}>
                <img
                  src={image.url}
                  alt="Base64"
                  style={{ maxWidth: "10%", height: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display the API response */}
      {apiResponse && (
        <div className={styles.api_response}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>API Response:</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export { FilePicker };
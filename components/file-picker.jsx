import React, { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { DropZone } from "./drop-zone";
import styles from "./file-picker.module.css";
import { FilesList } from "./files-list";

const FilePicker = ({ accept }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);

  // Handler called when files are selected via the Dropzone component
  const handleOnChange = useCallback((files) => {
    let filesArray = Array.from(files);

    filesArray = filesArray.map((file) => ({
      id: nanoid(),
      file,
    }));

    setFiles(filesArray);
    setProgress(0);
    setUploadStarted(false);
  }, []);

  // Handle for removing files from the files list view
  const handleClearFile = useCallback((id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  // Whether to show the progress bar or not
  const canShowProgress = useMemo(() => files.length > 0, [files.length]);

  // Execute the local image save operation
  const handleSaveLocally = useCallback(() => {
    try {
      // Simulate saving images locally by creating Object URLs
      const localImageUrls = files.map((file) => ({
        id: file.id,
        url: URL.createObjectURL(file.file),
      }));

      console.log("Local Image URLs:", localImageUrls);

      // Set progress to 100% and mark upload as complete
      setProgress(100);
      setUploadStarted(false);
    } catch (error) {
      console.error("Error saving images locally:", error);
    }
  }, [files]);


  // const handleSaveLocally = useCallback(() => {
  //   try {
  //     files.forEach((file) => {
  //       const localUrl = URL.createObjectURL(file.file);
        
  //       // Create an anchor element for downloading the file
  //       const anchor = document.createElement('a');
  //       anchor.href = localUrl;
  //       anchor.download = file.file.name;
        
  //       // Trigger a click event to prompt the download
  //       anchor.click();
        
  //       // Clean up by revoking the object URL
  //       URL.revokeObjectURL(localUrl);
  //     });
  
  //     // Set progress to 100% and mark upload as complete
  //     setProgress(100);
  //     setUploadStarted(false);
  //   } catch (error) {
  //     console.error("Error saving images locally:", error);
  //   }
  // }, [files]);
  

  // Set progress to zero when there are no files
  useEffect(() => {
    if (files.length < 1) {
      setProgress(0);
    }
  }, [files.length]);

  // Set uploadStarted to false when the upload is complete
  useEffect(() => {
    if (progress === 100) {
      setUploadStarted(false);
    }
  }, [progress]);

  const uploadComplete = useMemo(() => progress === 100, [progress]);

  return (
    <div className={styles.wrapper}>
      {/* canvas */}
      <div className={styles.canvas_wrapper}>
        <DropZone onChange={handleOnChange} accept={accept} />
      </div>

      {/* files listing */}
      {files.length ? (
        <div className={styles.files_list_wrapper}>
          <FilesList
            files={files}
            onClear={handleClearFile}
            uploadComplete={uploadComplete}
          />
        </div>
      ) : null}

      {/* progress bar */}
      {canShowProgress ? (
        <div className={styles.files_list_progress_wrapper}>
          <progress value={progress} max={100} style={{ width: "100%" }} />
        </div>
      ) : null}

      {/* save locally button */}
      {files.length ? (
        <button
          onClick={handleSaveLocally}
          className={styles.upload_button}
          disabled={uploadComplete || uploadStarted}
        >
         upload file
        </button>
      ) : null}
    </div>
  );
};

export { FilePicker };

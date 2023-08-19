import React, { useState } from "react";
const SingleFileUpload = () => {
   const [selectedFile, setSelectedFile] = useState(null);
   const handleFileChange = (e: any) => {
      setSelectedFile(e.target.files[0]);
   };

   const handleUpload = async () => {
      if (!selectedFile) {
         alert("Please first select a file");
         return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
         // Replace this URL with your server-side endpoint for handling file uploads
         const response = await fetch("http://localhost:8000/upload", {
            method: "POST",
            body: formData
         });

         if (response.ok) {
            alert("File upload is successfully");
         } else {
            alert("Failed to upload the file due to errors");
         }
      } catch (error) {
         console.error("Error while uploading the file:", error);
         alert("Error occurred while uploading the file");
      }
   };

   return (
   <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
   </div>
   );
};
export default SingleFileUpload;
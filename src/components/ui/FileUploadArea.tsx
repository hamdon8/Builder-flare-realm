import React, { useState, useRef } from "react";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";

interface FileUploadAreaProps {
  onFileUpload?: (files: FileList) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
}

export const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileUpload,
  acceptedTypes = [".dwg", ".step", ".iges", ".obj", ".stl"],
  maxSize = 50,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setUploadStatus("uploading");

    // Simulate upload process
    setTimeout(() => {
      setUploadedFiles(Array.from(files));
      setUploadStatus("success");
      onFileUpload?.(files);
    }, 2000);
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "uploading":
        return (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        );
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-400" />;
      case "error":
        return <AlertCircle className="h-8 w-8 text-red-400" />;
      default:
        return <Upload className="h-8 w-8 text-white/70" />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case "uploading":
        return "جاري رفع الملف...";
      case "success":
        return "تم رفع الملف بنجاح!";
      case "error":
        return "خطأ في رفع الملف";
      default:
        return "اسحب ملف CAD هنا أو انقر للتصفح";
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`upload-zone ${dragActive ? "border-white/80 bg-white/20" : ""} ${
          uploadStatus === "success"
            ? "border-green-400/60 bg-green-400/10"
            : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileSelector}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          {getStatusIcon()}

          <div className="text-center">
            <p className="text-white font-medium text-lg">{getStatusText()}</p>
            <p className="text-white/60 text-sm mt-2">
              الصيغ المدعومة: {acceptedTypes.join(", ")}
            </p>
            <p className="text-white/50 text-xs mt-1">
              الحد الأقصى: {maxSize} ميجابايت
            </p>
          </div>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="glass-panel p-4 space-y-2">
          <h4 className="text-white font-medium">الملفات المرفوعة:</h4>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 space-x-reverse text-white/80"
            >
              <File className="h-4 w-4" />
              <span className="text-sm">{file.name}</span>
              <span className="text-xs text-white/60">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

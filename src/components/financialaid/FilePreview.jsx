import React, { useEffect, useState } from 'react';
import { FileText, Image as ImageIcon, File, X } from 'lucide-react';

const FilePreview = ({ file, onRemove, darkMode }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [isPdf, setIsPdf] = useState(false);

    useEffect(() => {
        if (!file) return;

        const isImg = file.type.startsWith('image/');
        const isPd = file.type === 'application/pdf';
        setIsImage(isImg);
        setIsPdf(isPd);

        if (isImg) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    if (!file) return null;

    return (
        <div className={`relative group border rounded-lg p-2 ${darkMode ? 'bg-zinc-700 border-zinc-600' : 'bg-white border-zinc-200'} shadow-sm transition-all hover:shadow-md`}>
            {onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg z-10 hover:bg-red-600 transition-colors"
                >
                    <X size={12} />
                </button>
            )}

            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded flex items-center justify-center overflow-hidden flex-shrink-0 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                    {isImage && previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : isPdf ? (
                        <FileText className="text-red-500" size={24} />
                    ) : (
                        <File className={darkMode ? 'text-zinc-500' : 'text-zinc-400'} size={24} />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium truncate ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{file.name}</p>
                    <p className={`text-[10px] ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FilePreview;

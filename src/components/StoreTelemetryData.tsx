import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { storeTelemetryData } from '../services/api';

const StoreTelemetryData: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const mutation = useMutation({ mutationFn: storeTelemetryData });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            const base64File = await convertFileToBase64(file);
            mutation.mutate(base64File);
        }
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1];
                resolve(base64String);
            };
            reader.onerror = error => reject(error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
            <input
                type="file"
                accept=".dat"
                onChange={handleFileChange}
                className="p-2 text-lg border border-gray-300 rounded"
            />
            <button type="submit" className="p-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-700">
                Upload
            </button>
            {mutation.status === 'pending' && <p>Uploading...</p>}
            {mutation.status === 'error' && <p>Error uploading file</p>}
            {mutation.status === 'success' && <p>File uploaded successfully</p>}
        </form>
    );
};

export default StoreTelemetryData;

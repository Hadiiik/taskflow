import React from 'react';

interface ErrorMessagePopUPProps {
    message: string;
    onClose: () => void;
}

const ErrorMessagePopUP: React.FC<ErrorMessagePopUPProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-80 p-6">
                <h2 className="text-xl font-semibold text-red-500 mb-4">خطأ</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-500 transition duration-200"
                >
                    قبول
                </button>
            </div>
        </div>
    );
};

export default ErrorMessagePopUP;
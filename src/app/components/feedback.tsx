"use client";
import React, { useState } from "react";
import { X, MessageCircle, Send, CheckCircle } from "lucide-react";

interface FeedbackField {
  name: string;
  id: string;
}

const feedbackFields: FeedbackField[] = [
  { name: "First Name", id: "first-name" },
  { name: "Last Name", id: "last-name" },
  { name: "Email Address", id: "email-address" },
  { name: "URL", id: "url" },
  { name: "Subject", id: "subject" },
];

interface FeedbackDisplayProps {
  onInputChange: (id: string, value: string) => void;
}

const FeedbackDisplay = ({ onInputChange }: FeedbackDisplayProps) => {
  return (
    <div className="space-y-4">
      {feedbackFields.map((field) => (
        <div key={field.id} className="flex flex-col">
          <label
            htmlFor={field.id}
            className="text-sm font-medium text-gray-700 mb-1"
          >
            {field.name}
          </label>
          <input
            className="border text-black border-gray-300 grid grid-cols-2 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
            type="text"
            name={field.id}
            id={field.id}
            onChange={(e) => onInputChange(field.id, e.target.value)}
            placeholder={`Enter your ${field.name.toLowerCase()}`}
          />
        </div>
      ))}
    </div>
  );
};

interface FormData {
  [key: string]: string | undefined;
}

const FeedModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      setTimeout(() => setIsModalVisible(true), 10);
    } else {
      setIsModalVisible(false);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
      }, 300);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const isValid = feedbackFields.every((field) => formData[field.id] !== undefined);

    if (isValid) {
      setIsSubmitted(true);
      setTimeout(toggleModal, 2000);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="fixed z-[1000] bottom-10 left-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors group"
      >
        <MessageCircle
          className="group-hover:rotate-12 transition-transform"
          size={24}
        />
      </button>

      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex justify-center items-center z-[1000] p-4 ${
            isModalVisible ? "bg-opacity-50" : "bg-opacity-0"
          }`}
          onClick={toggleModal}
        >
          <div
            className={`bg-white rounded-xl shadow-2xl mt-20 w-[1000px]  max-h-[80vh] overflow-y-auto p-6 relative transition-all duration-300 ease-in-out transform ${
              isModalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitted ? (
              <>
                <button
                  onClick={toggleModal}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl text-blue-400 font-bold mb-4 text-center">
                  ECRAMME
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-600 text-start">
                    The web team will respond as time permits to inquiries
                    specifically regarding the website. If you're reporting a
                    site problem, please inform us of your browser and operating
                    system, as well as the URL of the page with which you're
                    having trouble. Please also provide the URL if you're
                    reporting a factual error.
                  </p>

                  <p className="text-gray-600 text-start mb-6">
                    Fill in appropriately and correctly.
                    <br />
                    <span className="text-red-500">
                      Note: All fields are required.
                    </span>
                  </p>

                  <FeedbackDisplay onInputChange={handleInputChange} />

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Submit Feedback</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <CheckCircle
                  size={64}
                  className="text-green-500 animate-bounce"
                />
                <h3 className="text-2xl font-bold text-gray-800">
                  Feedback Submitted!
                </h3>
                <p className="text-gray-600 text-center">
                  Thank you for helping us improve. We'll review your feedback
                  soon.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedModal;
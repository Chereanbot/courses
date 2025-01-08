import { useState } from "react";
import { useParams } from "@remix-run/react";
import { SignedIn } from "@clerk/remix";
import SharedLayout from "~/components/SharedLayout";

export default function PythonLesson() {
  const { lessonId } = useParams();
  const [activeTab, setActiveTab] = useState("content");

  // Mock lesson data - In a real app, this would come from a database
  const lessonData = {
    "python-basics": {
      title: "Python Basics",
      content: `# Introduction to Python
Python is a high-level, interpreted programming language that emphasizes code readability.

## Key Concepts
- Variables and Data Types
- Control Flow
- Functions
- Object-Oriented Programming`,
      video: "https://www.youtube.com/embed/your-video-id",
      exercises: [
        {
          id: 1,
          question: "What is the output of print('Hello ' + 'World')?",
          options: [
            "Hello World",
            "HelloWorld",
            "Error",
            "None of the above"
          ],
          correctAnswer: 0
        }
      ]
    },
    "data-structures": {
      title: "Data Structures in Python",
      content: `# Python Data Structures
Learn about fundamental data structures in Python.

## Topics Covered
- Lists
- Tuples
- Dictionaries
- Sets`,
      video: "https://www.youtube.com/embed/your-video-id",
      exercises: [
        {
          id: 1,
          question: "Which of these is mutable?",
          options: [
            "Tuple",
            "List",
            "String",
            "None of the above"
          ],
          correctAnswer: 1
        }
      ]
    }
  };

  const lesson = lessonData[lessonId as keyof typeof lessonData];

  if (!lesson) {
    return (
      <SignedIn>
        <SharedLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
              <p className="text-gray-600">The requested lesson does not exist.</p>
            </div>
          </div>
        </SharedLayout>
      </SignedIn>
    );
  }

  return (
    <SignedIn>
      <SharedLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Lesson Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("content")}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === "content"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab("video")}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === "video"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Video
              </button>
              <button
                onClick={() => setActiveTab("exercises")}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === "exercises"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Exercises
              </button>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {activeTab === "content" && (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </div>
            )}

            {activeTab === "video" && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={lesson.video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            )}

            {activeTab === "exercises" && (
              <div className="space-y-6">
                {lesson.exercises.map((exercise) => (
                  <div key={exercise.id} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {exercise.question}
                    </h3>
                    <div className="space-y-2">
                      {exercise.options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`exercise-${exercise.id}`}
                            value={index}
                            className="form-radio text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Submit Answer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Previous Lesson
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Next Lesson
            </button>
          </div>
        </div>
      </SharedLayout>
    </SignedIn>
  );
} 
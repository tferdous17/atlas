import { useState } from "react";
import axios from "axios";
import GraphComponent from "@/components/GraphComponent";

const MainPage = () => {
  const [prompt, setPrompt] = useState("");
  const [roadmapData, setRoadmapData] = useState<any>(null);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const sendRequest = () => {
    if (!prompt.trim()) return;

    axios
      .post("http://127.0.0.1:8000/api/generate-map", { text: prompt })
      .then((res) => {
        const data = {
          edges: res.data.edges || [],
          nodes: res.data.nodes
            ? res.data.nodes.map((node: any) => ({
                data: { label: node.data.label },
                id: node.id,
                label: node.data.label,
                position: {
                    x: node.position?.x || 0,
                    y: node.position?.y || 0,
                },
                type: node.type
              }))
            : [],
          project_name: res.data.project_name || "Untitled Project",
        };
        setRoadmapData(data); 
      })
      .catch((error) => {
        console.error("API Error:", error);
      });

    setPrompt("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendRequest();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const focusableElements = document.querySelectorAll<HTMLElement>(
        "textarea, button, input, select"
      );
      const index = Array.from(focusableElements).indexOf(e.currentTarget);
      if (index !== -1 && focusableElements[index + 1]) {
        focusableElements[index + 1].focus();
      }
    }
  };

  return (
    <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="flex h-screen flex-col flex-grow justify-center">
        <div className="flex flex-col w-full pb-4">
          <div className="relative max-w-3xl mx-auto">
            <h1 className="text-center text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text py-4 px-6 hover:scale-105 transition-transform duration-300">
              What can I help you create?
            </h1>
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              onKeyDown={handleKeyDown}
              className="w-full p-4 pr-12 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Input your project idea..."
              rows={1}
              style={{ minHeight: "56px", maxHeight: "200px", minWidth: "750px" }}
            />
            <button
              className={`absolute right-3 bottom-2.5 p-1 rounded-md ${
                prompt.trim()
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={sendRequest}
              disabled={!prompt.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Describe your idea as best as possible, and then let us do the rest.
          </p>
        </div>
        {roadmapData && (
          <GraphComponent dataNodes = {roadmapData.nodes}  dataEdges = {roadmapData.edges}/>
        )}
      </div>
    </div>
  );
};

export default MainPage;

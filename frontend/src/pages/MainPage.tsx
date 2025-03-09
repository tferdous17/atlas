import AppSidebar from '@/components/ui/app-sidebar';
import { useState } from 'react';

const MainPage = () => {
    const [prompt, setPrompt] = useState('');

      const handlePromptChange = (e: any) => {
        setPrompt(e.target.value);
      };

      return (
          <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
              <AppSidebar />
              <div className="flex h-screen  flex-col flex-grow justify-center">
                  <div className="flex flex-col w-full pb-4">
                      <form className="relative max-w-3xl mx-auto">
                      <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-900 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text py-4 px-6 hover:scale-105 transition-transform duration-300">What can I help you create?</h1>
                          <textarea
                              value={prompt}
                              onChange={handlePromptChange}
                              className="w-full p-4 pr-12 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              placeholder="Input your project idea..."
                              rows={1}
                              style={{ minHeight: '56px', maxHeight: '200px', minWidth: '750px' }}
                          />
                          <button
                              type="submit"
                              className={`absolute right-3 bottom-2.5 p-1 rounded-md ${prompt.trim() ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  }`}
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
                      </form>
                      <p className="text-xs text-gray-500 text-center mt-2">
                          Describe your idea as best as possible, and then let us do the rest.
                      </p>
                  </div>
                  
              </div>
          </div>
      );
    
}

export default MainPage
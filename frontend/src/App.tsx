import { motion } from "framer-motion";
import "reactflow/dist/style.css";
import LandingPageGraphComponent from "./components/LandingPageGraphComponent";
import FeatureCard from "./components/FeatureCard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] bg-[size:20px_20px]"
      ></motion.div>

      <nav className="relative flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-gray-800">Atlas</div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900">Product</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Docs</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Blog</a>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Login
        </motion.button>
      </nav>

      <header className="relative text-center py-20 px-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-gray-900 leading-snug"
        >
          Atlas: Interactive Project Roadmap Generator
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg"
        >
          A visual, interactive tool that dynamically maps out technologies, prerequisites, and dependencies for any project idea.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Get Started
        </motion.button>

        <div className="mt-16 flex justify-center">
          <LandingPageGraphComponent />
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FeatureCard
            title="AI-Powered Node Generation"
            description="Automatically generate project roadmaps by inputting your idea. The AI suggests technologies, frameworks, and dependencies."
          />
          <FeatureCard
            title="Click-to-Expand Knowledge Graph"
            description="Click on a node to see prerequisites, best resources, tutorials, and potential issues."
          />
          <FeatureCard
            title="Sandbox Mode for Customization"
            description="Drag, rearrange, delete, or add custom nodes to personalize your project roadmap."
          />
          <FeatureCard
            title="Multi-Domain Expansion"
            description="Generate graphs for health, software development, research, and environmental projects."
          />
        </div>
      </header>
    </div>
  );
}

export default App;

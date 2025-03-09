import LandingPageGraphComponent from "../components/LandingPageGraphComponent";
import FeatureCard from "../components/FeatureCard";
import { motion } from "framer-motion";


const LandingPage = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative absolute inset-0 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#3ea9ff_100%)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className=""
        ></motion.div>
  
        <nav className="relative flex justify-between items-center p-6 max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-gray-800 font-serif">Atlas</div>
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
            className="text-5xl font-bold text-gray-900 leading-snug text-transparent bg-clip-text text-center bg-gradient-to-r from-blue-500 to-purple-500 font-serif"
          >
            Atlas
          </motion.h1>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-7xl font-bold text-gray-900 leading-snug"
          >
            Your Roadmap to
          </motion.h1>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-7xl font-bold text-gray-900 leading-snug"
          >
            <span className="bg-yellow-300 px-1 inline rounded-sm">
              Smarter
            </span> Development.
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg"
          >
            Atlas is an interactive and visual AI-powered tool that dynamically maps out technologies, prerequisites, and dependencies for any project idea.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md shadow-md cursor-pointer"
          >
            <a href="/chat">Get Started →</a>
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
    )
}

export default LandingPage;

{/* <div class=></div> */}
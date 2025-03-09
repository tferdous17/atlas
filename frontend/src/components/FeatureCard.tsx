import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FeatureCard = ({ title, description, index = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.25, // stagger based on card index
        ease: [0.25, 0.1, 0.25, 1] // cubic-bezier easing for smoother motion
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ 
        scale: 1.03, 
        transition: { duration: 0.2 } 
      }}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
};

// Example usage in parent component:
const FeatureSection = () => {
  const features = [
    { title: "Feature 1", description: "Description for feature 1" },
    { title: "Feature 2", description: "Description for feature 2" },
    { title: "Feature 3", description: "Description for feature 3" },
    // Add more features as needed
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          index={index} 
          title={feature.title} 
          description={feature.description} 
        />
      ))}
    </div>
  );
};

export default FeatureCard;
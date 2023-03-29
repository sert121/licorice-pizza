import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Card = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      borderRadius="md"
      boxShadow="md"
      p={4}
      bg="white"
      overflow="hidden"
      onClick={handleClick}
    >
      <motion.div
        initial={{ borderRadius: "md", overflow: "hidden" }}
        animate={
          isExpanded
            ? { borderRadius: 0, overflow: "visible" }
            : { borderRadius: "md", overflow: "hidden" }
        }
        transition={{ duration: 0.3 }}
      >
        <Box>{title}</Box>
        {isExpanded && <Box mt={4}>{content}</Box>}
      </motion.div>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backdropFilter: "blur(5px)",
            zIndex: -1,
          }}
        />
      )}
    </Box>
  );
};

export default Card;

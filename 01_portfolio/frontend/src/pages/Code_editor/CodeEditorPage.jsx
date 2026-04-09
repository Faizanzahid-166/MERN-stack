import { motion } from "framer-motion";

export default function CodeEditorPage() {
  return (
    <div className="relative min-h-screen overflow-hidden 
      bg-gradient-to-br 
      from-emerald-100 via-sky-100 to-purple-100 
      dark:from-black dark:via-gray-900 dark:to-gray-800">

      {/* Floating background glow */}
      <motion.div
        className="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] 
        bg-green-500/30 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="relative max-w-5xl mx-auto px-6 py-20 text-gray-800 dark:text-gray-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 
          bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 
          bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Code Editor Playground
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl mb-10 
          bg-gradient-to-r from-emerald-600 to-sky-600 
          bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Practice, experiment, and explore HTML, JavaScript, SQL,
          and other programming languages — all in one place.
        </motion.p>

        {/* Feature Cards */}
        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl backdrop-blur-md shadow-md 
              border transition-all cursor-pointer hover:shadow-xl
              ${item.bg} ${item.border}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className={`text-xl font-semibold mb-2 ${item.titleColor}`}>
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Tip */}
        <motion.p
          className="mt-12 text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          💡 Tip: Modify the code and run it to see instant results.
          Learning by doing is the fastest way to grow 🚀
        </motion.p>
      </motion.div>
    </div>
  );
}

const features = [
  {
    title: "HTML Practice",
    desc: "Build layouts, experiment with tags, and design UI components.",
    bg: "bg-gradient-to-br from-orange-400/20 to-pink-400/20",
    border: "border-orange-400/30",
    titleColor: "text-orange-500",
  },
  {
    title: "JavaScript Playground",
    desc: "Test logic, functions, and real-time outputs instantly.",
    bg: "bg-gradient-to-br from-yellow-400/20 to-amber-400/20",
    border: "border-yellow-400/30",
    titleColor: "text-yellow-500",
  },
  {
    title: "SQL Exploration",
    desc: "Write queries and understand how databases work.",
    bg: "bg-gradient-to-br from-sky-400/20 to-blue-500/20",
    border: "border-blue-400/30",
    titleColor: "text-blue-500",
  },
  {
    title: "Explore More Languages",
    desc: "Try different languages and sharpen problem-solving skills.",
    bg: "bg-gradient-to-br from-purple-400/20 to-fuchsia-500/20",
    border: "border-purple-400/30",
    titleColor: "text-purple-500",
  },
];

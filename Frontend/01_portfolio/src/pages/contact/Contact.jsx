import { useState } from "react";
import { Link } from "react-router";
import { Github, Linkedin, Youtube } from "lucide-react";
import { sendContactForm } from "../../api/contactApi.js";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // ✅ success/error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await sendContactForm(formData);
      setStatus({ type: "success", msg: res.msg || "Message sent successfully 🚀" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", msg: "❌ Error sending message. Try again later." });
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setStatus(null);
  };

  return (
    <div className="min-h-scree p-6 md:p-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">📬 Contact Me</h2>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg border-gray-500 p-6 rounded-xl shadow-lg space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition"
          >
            Send Message
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </form>

      {/* ✅ Success/Error Message */}
      {status && (
        <p
          className={`mt-4 text-lg font-semibold ${
            status.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {status.msg}
        </p>
      )}

      {/* Follow Me */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
        <div className="flex gap-8 justify-center text-gray-400">
          <Link
            to="https://github.com/Faizanzahid-166"
            target="_blank"
            className="hover:text-green-500 flex flex-col items-center"
          >
            <Github size={28} />
            <span className="text-sm mt-1">GitHub</span>
          </Link>
          <Link
            to="https://www.linkedin.com/in/faizan-zahid-9671942a6/"
            target="_blank"
            className="hover:text-blue-400 flex flex-col items-center"
          >
            <Linkedin size={28} />
            <span className="text-sm mt-1">LinkedIn</span>
          </Link>
          <Link
            to="https://www.youtube.com/@entertainmenthub378/featured"
            target="_blank"
            className="hover:text-red-500 flex flex-col items-center"
          >
            <Youtube size={28} />
            <span className="text-sm mt-1">YouTube</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

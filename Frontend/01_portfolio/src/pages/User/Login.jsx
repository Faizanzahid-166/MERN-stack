import { useState } from "react";
import { loginAdmin } from "../../api/authApi.js";

export default function Login({ setToken }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginAdmin(form);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      alert("✅ Logged in!");
    } catch (err) {
      console.error(err);
      alert("❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-10 p-6 border rounded-md">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border px-3 py-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

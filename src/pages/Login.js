import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setError("尚未注册");
      return;
    }

    if (user.username === form.username && user.password === form.password) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      setError("账号或密码错误");
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">登录账号</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="用户名"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="密码"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            登录
          </button>
        </form>
      </div>
    </Layout>
  );
}

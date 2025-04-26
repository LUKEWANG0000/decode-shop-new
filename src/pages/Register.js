import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(form));
    alert("注册成功，请登录");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">注册账号</h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            注册
          </button>
        </form>
      </div>
    </Layout>
  );
}

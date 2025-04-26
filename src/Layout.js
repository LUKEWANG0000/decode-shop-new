// src/Layout.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleRechargeClick = () => {
    navigate("/recharge"); // ✅ 直接跳转
  };

  return (
    <div>
      <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 flex justify-between items-center shadow">
        <Link to="/" className="text-4xl font-extrabold tracking-wide">全球SMS</Link>

        <nav className="flex space-x-4 text-sm md:text-base items-center">
          <Link to="/" className="hover:text-yellow-200">接码</Link>
          <Link to="/us-api" className="hover:text-yellow-200">美国API</Link>
          <Link to="/us-card" className="hover:text-yellow-200">美国实体卡</Link>
          <Link to="/account-shop" className="hover:text-yellow-200">账号商店</Link>
          <Link to="/api-docs" className="hover:text-yellow-200">API说明</Link>
          <Link to="/about" className="hover:text-yellow-200">关于我们</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-green-200">登录</Link>
              <Link to="/register" className="hover:text-green-200">注册</Link>
            </>
          ) : (
            <>
              <button
                onClick={handleRechargeClick}
                className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
              >
                立即充值
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
              >
                退出登录
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="p-4">{children}</main>
    </div>
  );
}

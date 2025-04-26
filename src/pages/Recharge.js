// src/pages/Recharge.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Recharge() {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!amount || isNaN(amount)) {
      alert("请输入有效的充值金额");
      return;
    }
    navigate(`/pay?amount=${amount}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border-2 border-gray-200">
        <h2 className="text-center text-lg font-bold mb-2">
          今日USDT汇率1U等于<span className="text-blue-600">7.3 RMB</span>平台余额
        </h2>
        <p className="text-center mb-4">充值金额/价格关系：</p>
        <ul className="text-sm text-gray-700 mb-4 list-disc list-inside">
          <li>单次充值1 USDT：平台余额7.3</li>
          <li>单次充值20 USDT：赠送百分之1</li>
          <li>单次充值50 USDT：赠送百分之2</li>
          <li>单次充值100 USDT：赠送百分之5</li>
          <li>单次充值500 USDT：赠送百分之10</li>
        </ul>
        <p className="text-xs text-gray-500 mb-4 text-center">
          仅限单次充值赠送，充值完毕平台自动赠送到平台余额。
        </p>
        <input
          type="text"
          placeholder="请输入充值金额<USDT>"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
        >
          确认充值
        </button>
      </div>
    </div>
  );
}

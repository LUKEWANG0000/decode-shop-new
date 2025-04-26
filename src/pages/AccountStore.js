import React, { useState } from "react";
import Layout from "../Layout";

const products = [
  {
    name: "WhatsApp号码+api接收验证码（直营号）",
    country: "英国 +44",
    price: 6.0,
    stock: "较少",
  },
  {
    name: "WhatsApp号码+api接收验证码（直营号）",
    country: "香港 +852",
    price: 5.0,
    stock: 0,
  },
  {
    name: "tg/飞机 成品账号",
    country: "南非",
    price: 1.0,
    stock: 0,
  },
  {
    name: "tg/飞机 成品账号",
    country: "美国 +1（任意方式登录）",
    price: 1.38,
    stock: "很多",
  },
  {
    name: "美国的飞机会员号",
    country: "美国 +1",
    price: 3.0,
    stock: `${Math.floor(Math.random() * 501) + 500}`,
  },
];

export default function AccountStore() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className="bg-white shadow rounded-xl p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">账号商店</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            购买记录
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold mb-2">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-1">国家: {p.country}</p>
              <p className="text-sm text-gray-600 mb-1">
                价格: <span className="text-red-500">{p.price.toFixed(2)} 美元 / 个</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">库存: {p.stock}</p>
              <input
                type="number"
                placeholder="输入购买数量"
                className="border p-1 rounded w-full mb-2"
              />
              <button className="bg-green-600 w-full text-white px-4 py-2 rounded hover:bg-green-700">
                购买
              </button>
            </div>
          ))}
        </div>

        {/* 弹窗区域 */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
              <h3 className="text-lg font-bold mb-2">购买记录</h3>
              <p className="text-gray-600 mb-4">暂无记录。</p>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={() => setShowModal(false)}
              >
                关闭
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center mt-6 space-x-2 text-sm">
          <button className="px-3 py-1 border rounded">首页</button>
          <button className="px-3 py-1 border rounded">1</button>
          <button className="px-3 py-1 border rounded">末页</button>
        </div>
      </div>
    </Layout>
  );
}

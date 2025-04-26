import React from "react";
import Layout from "../Layout";

export default function ApiDocs() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 text-gray-800 mt-6">
        <h1 className="text-2xl font-bold mb-4">API 接口说明</h1>

        <p className="mb-4">
          欢迎使用全球SMS平台的开发者API，您可以通过接口自动获取号码、接收验证码等功能。
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">接口地址</h2>
        <code className="bg-gray-100 p-2 block rounded mb-2">
          GET https://你的域名/api/get_number
        </code>

        <h2 className="text-xl font-semibold mt-4 mb-2">请求参数</h2>
        <ul className="list-disc list-inside mb-4">
          <li><strong>token</strong>：用户API密钥</li>
          <li><strong>country</strong>：国家代码（如 CN）</li>
          <li><strong>service</strong>：项目名称（如 telegram、nike）</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">响应示例</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`{
  "success": true,
  "number": "+8613488888888",
  "order_id": "1234567890"
}`}
        </pre>

        <h2 className="text-xl font-semibold mt-4 mb-2">获取短信内容</h2>
        <code className="bg-gray-100 p-2 block rounded mb-2">
          GET https://你的域名/api/get_sms?order_id=1234567890
        </code>

        <h2 className="text-xl font-semibold mt-4 mb-2">返回结果</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`{
  "sms": "验证码是123456，请勿泄露。"
}`}
        </pre>
      </div>
    </Layout>
  );
}

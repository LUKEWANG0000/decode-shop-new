import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Dapp() {
  const [params] = useSearchParams();
  const username = params.get("username");
  const amount = params.get("amount");

  async function handlePayment() {
    if (!window.ethereum) {
      alert('未检测到钱包，请在钱包内打开页面或安装钱包插件。');
      return;
    }

    try {
      // 请求连接钱包
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('连接成功，账户地址：', accounts[0]);
      alert('钱包连接成功！可以继续付款了（这里只是测试连接）');
    } catch (error) {
      console.error('连接失败：', error);
      alert('连接钱包失败');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="bg-purple-600 text-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          🛒 付款信息
        </h2>
        <div className="text-left space-y-4">
          <p>用户名: {username || "未提供"}</p>
          <p>付款金额: {amount || "0"} USDT</p>
          <p>实际到账金额: {(amount ? (parseFloat(amount) * 7.4).toFixed(2) : "0")} RMB</p>
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-md"
      >
        点击付款
      </button>
    </div>
  );
}

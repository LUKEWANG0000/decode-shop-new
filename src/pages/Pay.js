import React from "react";
import { useLocation } from "react-router-dom";

export default function Pay() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get("amount") || 0;
  const rmb = (amount * 7.3).toFixed(2);

  return (
    <div className="min-h-screen bg-[#f0f6fd] flex justify-center p-8">
      <div className="w-full max-w-4xl space-y-6">

        {/* 顶部紫色信息卡 */}
        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold mb-4">💳 付款信息</h2>
          <p><strong>用户名：</strong>wjmwjm1101</p>
          <p><strong>付款金额：</strong>{amount} USDT</p>
          <p><strong>实际到账金额：</strong>{rmb} RMB</p>
        </div>

        {/* 支付说明 */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold mb-4 text-gray-800">支付说明</h2>
          <p className="text-sm text-gray-600 mb-4">
            请打开钱包首页扫码付款，仅支持TRC链付款。
          </p>
          <div className="flex justify-center mb-4">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=TRC20walletpayment"
              alt="扫码支付"
              className="w-40 h-40"
            />
          </div>

          <p className="text-sm text-gray-700 mb-1">
            或者 TRC20地址转账：
            <span className="font-mono text-blue-600">
              TXzxxxxxGvZxxxxxxxxxxXL
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            地址转账请与客服联系确认截图，扫码支付无需确认，自动到账。
          </p>
        </div>

        {/* 提示信息 */}
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-orange-500">
          <h3 className="font-semibold text-orange-600">🔔 提示</h3>
          <p className="text-sm text-gray-700 mt-2">
            请使用钱包首页的扫码功能。付款成功后自动到账，如果未到账请联系客服。
          </p>
        </div>
      </div>
    </div>
  );
}

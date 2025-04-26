import React from "react";

export default function MyTable() {
  const fakeData = []; // 永远为空

  return (
    <div className="mt-12 bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">我的接码</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="border px-2 py-1">号码</th>
              <th className="border px-2 py-1">短信状态</th>
              <th className="border px-2 py-1">操作</th>
              <th className="border px-2 py-1">剩余时间</th>
              <th className="border px-2 py-1">实际价格</th>
              <th className="border px-2 py-1">订单号</th>
              <th className="border px-2 py-1">服务名</th>
              <th className="border px-2 py-1">完整短信</th>
              <th className="border px-2 py-1">购买时间</th>
            </tr>
          </thead>
          <tbody>
            {fakeData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-400">
                  暂无接码记录
                </td>
              </tr>
            ) : (
              fakeData.map((row, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{row.number}</td>
                  <td className="border px-2 py-1">{row.status}</td>
                  <td className="border px-2 py-1">{row.action}</td>
                  <td className="border px-2 py-1">{row.timeLeft}</td>
                  <td className="border px-2 py-1">{row.price}</td>
                  <td className="border px-2 py-1">{row.orderId}</td>
                  <td className="border px-2 py-1">{row.service}</td>
                  <td className="border px-2 py-1">{row.sms}</td>
                  <td className="border px-2 py-1">{row.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 分页按钮 */}
        <div className="flex justify-end gap-4 mt-4 text-sm text-blue-600">
          <button>首页</button>
          <button>末页</button>
        </div>
      </div>
    </div>
  );
}

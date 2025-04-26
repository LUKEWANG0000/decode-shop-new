import Dapp from "./pages/Dapp";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Pay from "./pages/Pay";
import Recharge from "./pages/Recharge";
import ApiDocs from "./pages/ApiDocs";

import AccountStore from "./pages/AccountStore";


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import MyTable from "./MyTable";

// 公共接码页面组件
function HomePage({ title = "接码", countryFixed = false }) {
  const countries = [
    "中国", "美国", "英国", "俄罗斯", "印度", "日本", "法国", "德国", "菲律宾", "澳大利亚",
    "加拿大", "马来西亚", "越南", "新加坡", "泰国", "印尼", "韩国", "西班牙", "意大利", "阿联酋",
    "土耳其", "乌克兰", "阿根廷", "尼日利亚", "南非", "墨西哥", "沙特", "伊朗", "巴西", "以色列",
    "波兰", "荷兰", "瑞典", "比利时", "丹麦", "芬兰", "捷克", "奥地利", "匈牙利", "希腊",
    "智利", "哥伦比亚", "秘鲁", "委内瑞拉", "新西兰", "罗马尼亚", "埃及", "哈萨克斯坦", "白俄罗斯", "蒙古"
  ];
  const services = [
    "全业务（未在列表）", "微信", "WhatsApp", "Telegram", "Facebook", "Twitter", "Instagram", "抖音", "淘宝",
    "支付宝", "Steam", "Snapchat", "Google", "Apple ID", "Bilibili", "小红书", "拼多多", "LinkedIn", "知乎",
    "京东", "美团", "滴滴", "唯品会", "网易", "QQ", "QQ邮箱", "亚马逊", "PayPal", "Shopee", "TikTok",
    "优酷", "爱奇艺", "百度", "快手", "小米", "飞猪", "携程", "Nike", "天猫"
  ];
  const lines = ["一号线路", "二号线路", "三号线路"];

  const [country, setCountry] = React.useState("美国");
  const [service, setService] = React.useState("全业务（未在列表）");
  const [line, setLine] = React.useState("一号线路");
  const price = service === "全业务（未在列表）" ? "0.40" : (Math.random() * 0.1 + 0.1).toFixed(2);

  const handleBuy = () => {
    alert("请先登录后再购买（模拟提示）");
  };

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <select className="border p-2 rounded" value={country} onChange={(e) => setCountry(e.target.value)} disabled={countryFixed}>
          {(countryFixed ? ["美国"] : countries).map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>
        <select className="border p-2 rounded" value={service} onChange={(e) => setService(e.target.value)}>
          {services.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>
        <select className="border p-2 rounded" value={line} onChange={(e) => setLine(e.target.value)}>
          {lines.map((l, idx) => (
            <option key={idx} value={l}>{l}</option>
          ))}
        </select>
        <input type="text" value={`${price} U`} readOnly className="border p-2 rounded text-right" />
        <button onClick={handleBuy} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          购买
        </button>
      </div>

      {/* 我的接码表格组件 */}
      <MyTable />
    </Layout>
  );
}

// 关于我们页面
function AboutPage() {
  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">关于我们</h2>
      <p className="mb-2">本站主域名：等待上服务器</p>
      <p className="mb-2">全球SMS，提供全面的各个国家的号码，美国虚拟号码是我们的特色，有大量并且价格低廉。</p>
      <h3 className="text-lg font-semibold mt-6 mb-2">免责条款：</h3>
      <ul className="list-disc pl-6 space-y-1 text-sm">
        <li>本站所有号码提供给用户做正常注册合法app使用。</li>
        <li>用户不准使用或者提供给别人使用本站号码做非法用途。</li>
        <li>用户不准在中国使用本站。</li>
        <li>用户违规使用本站，可能会被禁用账户。</li>
        <li>使用本网站提供的号码，发生违法犯罪责任由消费者承担，与本站无关。</li>
      </ul>
      <h3 className="text-lg font-semibold mt-6 mb-2">联系我们：</h3>
      <p>WhatsApp：+1（289）718 5197</p>
      <p>Telegram：@luketang00 （谨防冒充客服，看准id而不是用户名）</p>
    </Layout>
  );
}

// 主程序路由
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage title="接码" />} />
        <Route path="/us-api" element={<HomePage title="美国API" countryFixed={true} />} />
        <Route path="/us-card" element={<HomePage title="美国实体卡" countryFixed={true} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/account-shop" element={<AccountStore />} />
        <Route path="/dapp" element={<Dapp />} />

        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/recharge" element={<Recharge />} />
<Route path="/pay" element={<Pay />} />
      </Routes>
    </Router>
  );
}

import React, { useState } from "react";

const InteractiveTabsCard = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="tabs flex">
        <button
          className={`tab ${activeTab === "tab1" ? "active" : ""}`}
          onClick={() => toggleTab("tab1")}
        >
          Tab 1
        </button>
        <button
          className={`tab ${activeTab === "tab2" ? "active" : ""}`}
          onClick={() => toggleTab("tab2")}
        >
          Tab 2
        </button>
        <button
          className={`tab ${activeTab === "tab3" ? "active" : ""}`}
          onClick={() => toggleTab("tab3")}
        >
          Tab 3
        </button>
      </div>

      <div className="content">
        {activeTab === "tab1" && (
          <div className="p-6">
            <p>Content for Tab 1</p>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="p-6">
            <p>Content for Tab 2</p>
          </div>
        )}
        {activeTab === "tab3" && (
          <div className="p-6">
            <p>Content for Tab 3</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveTabsCard;
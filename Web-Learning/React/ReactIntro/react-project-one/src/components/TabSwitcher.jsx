import { useState } from 'react';

const TabSwitcher = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
    { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
  ];

  return (
    <div>
      {/* Tab Buttons */}
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              marginRight: '5px',
              backgroundColor: activeTab === tab.id ? '#007BFF' : '#CCCCCC',
              color: activeTab === tab.id ? '#FFFFFF' : '#000000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div style={{ padding: '1rem', border: '1px solid #CCCCCC' }}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabSwitcher;
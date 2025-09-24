import React from 'react';
import { FaLightbulb, FaReceipt } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

interface QuickActionsProps {
  onActionSelect: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionSelect }) => {
  const actions = [
    { id: 'electricity', label: 'Electricity', icon: <FaLightbulb size={28} />
 },
    { id: 'loan', label: 'Loan', icon: <GiTakeMyMoney size={28} />
},
    { id: 'invest', label: 'Invest', icon: <FaMoneyBillTrendUp size={28}  />
},
    { id: "pay", label: "Pay", icon: <FaReceipt size={28} /> },

  ];

  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-gray-800 font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionSelect(action.id)}
            className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl mb-2 text-[#03305c]">{action.icon}</span>
            <span className="text-sm text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
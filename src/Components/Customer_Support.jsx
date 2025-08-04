import React from "react";
import { PhoneCall, HelpCircle, UserCheck } from "lucide-react";

const Customer_Support = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 max-w-4xl mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Expert Advice */}
        <div className="flex flex-col items-center space-y-2">
          <UserCheck className="w-8 h-8 text-blue-600" />
          <h3 className="text-lg font-semibold">Expert Advice</h3>
          <p className="text-gray-600 text-base">123-456-7890</p>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col items-center space-y-2">
          <PhoneCall className="w-8 h-8 text-green-600" />
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <p className="text-gray-600 text-base">1-222-345-6789</p>
        </div>

        {/* General Questions */}
        <div className="flex flex-col items-center space-y-2">
          <HelpCircle className="w-8 h-8 text-purple-600" />
          <h3 className="text-lg font-semibold">Have any questions?</h3>
          <p className="text-gray-600 text-base">Contact us</p>
        </div>
      </div>
    </div>
  );
};

export default Customer_Support;

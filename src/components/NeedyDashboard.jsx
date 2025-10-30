import React from "react";

const mockDonations = [
  { id: 1, donorName: "Rahul Sharma", amount: 2000, date: "2025-01-12", message: "Stay strong!" },
  { id: 2, donorName: "Aisha Khan", amount: 1500, date: "2025-01-15", message: "Wishing you the best" },
  { id: 3, donorName: "Rohan Patel", amount: 500, date: "2025-01-18", message: "God bless you" },
];

export default function NeedyDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Needy Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Donations Received</h2>
        <p className="text-3xl font-bold text-green-600">
          ₹{mockDonations.reduce((acc, d) => acc + d.amount, 0)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Donations</h2>

        <div className="space-y-4">
          {mockDonations.map((don) => (
            <div key={don.id} className="p-4 border rounded-lg hover:shadow-md transition bg-gray-50">
              <div className="flex justify-between">
                <p className="font-bold text-gray-800">{don.donorName}</p>
                <p className="font-semibold text-green-600">₹{don.amount}</p>
              </div>
              <p className="text-sm text-gray-500">Date: {don.date}</p>
              <p className="text-sm mt-1 text-gray-600 italic">"{don.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

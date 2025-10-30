import React, { useEffect, useState } from "react";

const NeedyList = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [needy, setNeedy] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("none");
  const [maxIncome, setMaxIncome] = useState("");
  const [dark, setDark] = useState(false);

  const [selected, setSelected] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    fetchNeedy();
  }, []);

  const fetchNeedy = async () => {
    try {
      const res = await fetch(`${API_URL}/needy-list`);
      const data = await res.json();
      setNeedy(data);
      setFiltered(data);
    } catch {
      alert("Server error fetching needy list.");
    }
    setLoading(false);
  };

  useEffect(() => {
    let list = [...needy];

    if (search.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (maxIncome) {
      list = list.filter((p) => p.income <= maxIncome);
    }

    if (sortType === "low-income") {
      list.sort((a, b) => a.income - b.income);
    }
    if (sortType === "recent") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFiltered(list);
  }, [search, maxIncome, sortType, needy]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-gray-100"} min-h-screen p-6`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Needy Profiles</h1>
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-3 rounded border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Income ₹"
          className="p-3 rounded border"
          value={maxIncome}
          onChange={(e) => setMaxIncome(e.target.value)}
        />

        <select
          className="p-3 rounded border"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="low-income">Lowest Income</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>

      {/* Card Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <div key={p._id} className="rounded-xl shadow-lg p-4 bg-white dark:bg-gray-800">
            
            <div className="flex items-center gap-3 mb-3">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.name}`}
                className="w-14 h-14 rounded-full border"
              />
              <div>
                <h2 className="font-bold text-lg">{p.name}</h2>
                <p className="text-sm text-gray-500">{p.address}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-green-200 px-2 py-1 rounded">Verified Need</span>
              <span className="text-xs bg-blue-200 px-2 py-1 rounded">Humanitarian</span>
            </div>

            <p className="text-gray-700 line-clamp-2 mb-3">{p.story}</p>

            <p className="font-semibold text-sm mb-2">
              Monthly Income: ₹{p.income}
            </p>
            <p className="text-sm text-gray-600">Phone: {p.phone}</p>

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelected(p)}
                className="px-3 py-2 text-sm bg-gray-800 text-white rounded"
              >
                View Story
              </button>
              <button
                onClick={() => {
                  const amt = prompt("Enter donation amount ₹");
                  if (amt) alert(`Donation recorded: ₹${amt}`);
                }}
                className="px-3 py-2 text-sm bg-green-600 text-white rounded"
              >
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">{selected.name}</h2>
            <p className="mb-4">{selected.story}</p>

            <button
              onClick={() => setSelected(null)}
              className="px-4 py-2 bg-red-600 text-white rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default NeedyList;

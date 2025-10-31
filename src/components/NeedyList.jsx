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
    <div className={`${dark ? "bg-slate-900 text-white" : "bg-blue-50"} min-h-screen p-6`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100">Needy Profiles</h1>
        <button
          onClick={() => setDark(!dark)}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 shadow-md"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-4 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Income ₹"
          className="p-4 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          value={maxIncome}
          onChange={(e) => setMaxIncome(e.target.value)}
        />

        <select
          className="p-4 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-white"
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
          <div key={p._id} className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700">

            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${p.name}`}
                className="w-16 h-16 rounded-full border-2 border-blue-200 dark:border-slate-600"
              />
              <div>
                <h2 className="font-bold text-xl text-blue-900 dark:text-blue-100">{p.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{p.address}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Verified Need</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Humanitarian</span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">{p.story}</p>

            <div className="border-t border-blue-100 dark:border-slate-600 pt-4">
              <p className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-2">
                Monthly Income: ₹{p.income}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {p.phone}</p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between gap-3">
              <button
                onClick={() => setSelected(p)}
                className="flex-1 px-4 py-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md"
              >
                View Story
              </button>
              <button
                onClick={() => {
                  const amt = prompt("Enter donation amount ₹");
                  if (amt) alert(`Donation recorded: ₹${amt}`);
                }}
                className="flex-1 px-4 py-3 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md"
              >
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-blue-100 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${selected.name}`}
                className="w-16 h-16 rounded-full border-2 border-blue-200 dark:border-slate-600"
              />
              <div>
                <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">{selected.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selected.address}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Story</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selected.story}</p>
            </div>

            <div className="border-t border-blue-100 dark:border-slate-600 pt-4 mb-6">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Monthly Income: ₹{selected.income}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Phone: {selected.phone}</p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md"
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

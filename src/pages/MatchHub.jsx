import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaFutbol } from "react-icons/fa";
import Header from "../components/Header";
import AppFooter from "../components/Footer";
import { Link } from "react-router-dom";
import { getAllCompetitionsAPI } from "../services/allAPIs";
import { useContext } from "react";
import { SearchContext } from "../context/ContextShare";
function MatchHub({ active, setActive }) {
  const [compData, setCompData] = useState();
  const { searchKey, setSearchKey } = useContext(SearchContext);
  useEffect(() => {
    setActive(4);
  }, []);
  const getCompetitions = async () => {
    try {
      const result = await getAllCompetitionsAPI(searchKey);
      console.log(result.data);
      setCompData(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCompetitions(searchKey);
  }, [searchKey]);
  console.log(compData);
  console.log(searchKey);

  return (
    <div>
      <Header active={active} />{" "}
      <div className="min-h-screen bg-gray-50">
        {/* Top Banner with blurred background */}
        <div className="relative h-100 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/80"></div>
          <img
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Football stadium banner"
            className="w-full h-full object-cover blur-sm object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                MatchHub
              </h1>
              <p className="text-2xl text-gray-100 font-medium">
                Your Gateway to Every Turf War
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 px-[10%]">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <input
                onChange={(e) => setSearchKey(e.target.value)}
                type="text"
                placeholder="Search competitions..."
                className="w-full py-3 px-5 pr-12 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                <FiSearch size={20} />
              </button>
            </div>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <FaFutbol className="mr-3 text-green-600" />
            Currently Active Competitions
          </h2>

          {/* Competitions List */}
          <div className="space-y-6">
            {compData?.length > 0 ? (
              compData.map((item) => (
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <div className="h-48 md:h-full md:w-48 bg-gray-200 flex items-center justify-center">
                        <img
                          className="h-full w-full object-cover rounded-l-xl"
                          src={`http://localhost:3000/uploads/${item.competitionImage}`}
                          alt="Premier League"
                        />
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                        Football Competition
                      </div>
                      <h3 className="mt-2 text-2xl font-bold text-gray-900">
                        {item.tournamentName}
                      </h3>
                      <div className="mt-4 space-y-2">
                        <p className="flex items-center text-gray-600">
                          <span className="font-medium mr-2">Host:</span>
                          {item.organizationName}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <span className="font-medium mr-2">
                            District/Platform:
                          </span>
                          {item.eventLocation}
                        </p>
                      </div>
                      <div className="mt-6">
                        <Link to={`/fixtures/${item._id}`}>
                          <button className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                            View Fixtures & Results
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>No Competitions</p>
              </div>
            )}
            {/* Competition 1 */}
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default MatchHub;

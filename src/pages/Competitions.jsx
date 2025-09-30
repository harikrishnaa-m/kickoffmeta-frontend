import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { getAllCompetitionsAPI } from "../services/allAPIs";
import { SearchContext } from "../context/ContextShare";

function Competitions({ active, setActive }) {
  //state to store all competitions
  const [allCompetitions, setAllCompetitions] = useState([]);
  //state to filter
  const [tempCompetition, setTempCompetition] = useState([]);
  //original state for sorting
  const [originalData, setOriginalData] = useState([]);
  //state to do filtering
  const [filterValue, setFilterValue] = useState("");
  //state for searchKey
  const { searchKey, setSearchKey } = useContext(SearchContext);
  useEffect(() => {
    setActive(1);
  }, []);
  //to get all competitions
  const getAllCompetitions = async (searchKey) => {
    try {
      const result = await getAllCompetitionsAPI(searchKey);
      console.log(result);
      setAllCompetitions(result.data);
      setTempCompetition(result.data);
      setOriginalData(result.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  useEffect(() => {
    getAllCompetitions(searchKey);
  }, [searchKey]);
  console.log(allCompetitions);
  //serverURL backend
  const serverURL = "https://kickoffmeta-backend.onrender.com";
  console.log(filterValue);
  //handle filter
  const handleFilter = (data) => {
    setAllCompetitions(tempCompetition.filter((item) => item.format == data));
  };
  const handleClearFilter = () => {
    setAllCompetitions(originalData);
  };
  //sorting
  const sortAsc = () => {
    setAllCompetitions(
      [...allCompetitions].sort(
        (a, b) => Number(a.entryFee) - Number(b.entryFee)
      )
    );
  };

  const sortDesc = () => {
    setAllCompetitions(
      [...allCompetitions].sort(
        (a, b) => Number(b.entryFee) - Number(a.entryFee)
      )
    );
  };

  const resetSort = () => {
    setAllCompetitions(originalData);
  };
  console.log(searchKey);

  return (
    <div>
      <Header
        className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
        active={active}
      />
      <section className="flex  w-full">
        {/* leftpanel */}
        <div className="flex flex-col w-1/5 h-screen overflow-y-auto shadow-lg text-sm md:text-xl lg:text-xl  fixed left-0 top-[88px] border-r border-neutral-800/20  p-8 py-20 ">
          <div className="flex flex-col my-4">
            <h2 className="text-sm md:text-xl lg:text-xl font-bold  text-gray-900">
              Filter by Format
            </h2>
            <p
              onClick={handleClearFilter}
              className="text-xs md:text-sm lg:text-sm text-blue-700 hover:underline cursor-pointer"
            >
              Clear All
            </p>
          </div>

          <div className="text-sm md:text-xl lg:text-xl space-y-2">
            <div className="flex space-x-2">
              <input
                onChange={(e) => setFilterValue(e.target.value)}
                onClick={() => handleFilter("Penalty Shootouts")}
                value={"Penalty Shootouts"}
                className="w-5 accent-indigo-600"
                type="radio"
                name="matchType"
              />
              <label htmlFor="Penalty Shootout">Penalty Shootouts</label>
            </div>
            <div className="flex space-x-2">
              <input
                onClick={() => handleFilter("Mini Match")}
                value={"Mini Match"}
                className="w-5 accent-indigo-600"
                type="radio"
                name="matchType"
              />
              <label htmlFor="Mini Match">Mini Match (5v5)</label>
            </div>
            <div className="flex space-x-2">
              <input
                onClick={() => handleFilter("Full Game")}
                value={"Full Game"}
                className="w-5 accent-indigo-600"
                type="radio"
                name="matchType"
              />
              <label htmlFor="Full Match">Full Match (11v11)</label>
            </div>
            <div className="flex space-x-2">
              <input
                onClick={() => handleFilter("Speed Game")}
                value={"Speed Game"}
                className="w-5 accent-indigo-600"
                type="radio"
                name="matchType"
              />
              <label htmlFor="Speed Game">Speed Game (7v7)</label>
            </div>
            <div className="flex space-x-2">
              <input
                onClick={() => handleFilter("Virtual League")}
                value={"Virtual League"}
                className="w-5 accent-indigo-600"
                type="radio"
                name="matchType"
              />
              <label htmlFor="Virtual League">Virtual League </label>
            </div>
          </div>
        </div>
        {/* rightpanel */}
        <div className="flex flex-col ml-[20%] min-h-screen items-start p-10 pt-25 w-4/5 ">
          <div className="w-full flex justify-center items-center my-10">
            <div className="flex">
              <input
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
                type="text"
                className="rounded-l border border-neutral-950/20 focus:outline-0 w-150 p-3"
                placeholder="Search Tournaments"
              />
              <button className="btn bg-gray-900 text-white rounded-r p-3">
                Search
              </button>
            </div>
          </div>
          <div className="flex flex-col ml-15">
            <div className="flex justify-between">
              <p className="text-3xl font-semibold">
                Find the Perfect Tournament for Your Squad
              </p>
              <div className="flex items-center ml-43">
                <label className="font-semibold" htmlFor="sort">
                  Sort By
                </label>
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "lowestfee") {
                      sortAsc();
                    } else if (value === "highestfee") {
                      sortDesc();
                    } else {
                      resetSort();
                    }
                  }}
                  className="border border-neutral-950/30 rounded mx-2 cursor-pointer"
                  name="sort"
                  id="sort"
                >
                  <option value="hottest">Most Relevant</option>
                  <option value="lowestfee">Price: Low to High</option>
                  <option value="highestfee">Price: High to Low</option>
                </select>
              </div>
            </div>

            <p className="text-sm ">
              Explore formats, locations, and dates — from 5-a-side battles to
              11-a-side showdowns.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-7   w-full">
            {allCompetitions?.length > 0 ? (
              allCompetitions.map((item) => (
                <div className=" mx-5 my-10 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
                  <img
                    className="w-full h-48 object-cover position-center rounded-t-xl"
                    src={`${serverURL}/uploads/${item.competitionImage[0]}`}
                    alt="Tournament"
                  />
                  <div className="p-5 w-full flex flex-col items-center">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                      {item.tournamentName}
                    </h5>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.format} · {item.eventLocation}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      📅 {new Date(item.dateOfEvent).toDateString()}
                    </p>
                    <div className="flex items-center space-x-1">
                      <p className="text-xl font-bold text-blue-800/90 mt-1">
                        Entry Fee :
                      </p>
                      <p className="text-xl font-bold text-blue-700 mt-1">
                        {" "}
                        ₹{item.entryFee}
                      </p>
                    </div>
                    <Link
                      className="mt-4 px-4 py-2 bg-indigo-600 text-center hover:bg-indigo-700 text-white rounded-lg w-full text-sm font-semibold transition"
                      to={`/competitiondetails/${item._id}`}
                    >
                      {" "}
                      <button>Register Now</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center my-10">No Competitions Found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Competitions;

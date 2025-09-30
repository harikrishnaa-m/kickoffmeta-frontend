import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AppFooter from "../components/Footer";
import {
  FaTrophy,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLocationArrow,
} from "react-icons/fa";
import Teamreg from "./components/Teamreg";
import { useParams } from "react-router-dom";
import { getACompetitionAPI } from "../services/allAPIs";

function Details() {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState([]);
  //to get competition details
  const getCompetition = async (id) => {
    try {
      const result = await getACompetitionAPI(id);
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCompetition(id);
  }, []);
  const serverURL = "https://kickoffmeta-backend.onrender.com";
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div>
          {data && (
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 p-6 bg-white rounded-2xl shadow-2xl border border-gray-950/10">
              {/* left */}
              <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                <div className="relative w-full h-120 md:h-80 overflow-hidden rounded-xl">
                  <img
                    src={
                      data?.competitionImage?.[0]
                        ? `${serverURL}/uploads/${data.competitionImage[0]}`
                        : "/placeholder.jpg" //
                    }
                    alt="Hall of Fame Cup"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                {/* <button className="mt-4 px-8 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2">
              <FaTrophy /> Register Now
            </button> */}
                <Teamreg
                  competitionId={id}
                  entryFee={data.entryFee}
                  Matchformat={data.format}
                  title={data.tournamentName}
                />
              </div>
              {/* right */}
              <div className="flex flex-col justify-start py-5 w-full md:w-1/2 space-y-4">
                <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                  {data?.tournamentName}
                </h1>
                <h2 className="text-xl font-semibold text-gray-600 flex items-center gap-2">
                  <FaLocationArrow className="text-indigo-600" /> Organized by
                  <span className="mx-1">{data?.organizationName}</span>
                </h2>
                <p className="text-lg text-gray-600 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-indigo-600" />{" "}
                  {data?.eventLocation}
                </p>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-indigo-600" />
                  <p className="text-gray-700">
                    {data.dateOfEvent
                      ? new Date(data.dateOfEvent).toDateString()
                      : ""}
                  </p>
                </div>
                <p className="text-lg font-medium text-gray-800">
                  Entry Fee:{" "}
                  <span className="text-indigo-600">₹{data?.entryFee}</span>
                </p>
                <p className="text-lg font-medium text-gray-800">
                  Winner Prize:{" "}
                  <span className="text-indigo-600">₹{data.winnersPrize}</span>
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Join us for an exciting{" "}
                  <span className="font-semibold">{data.format}</span> event in{" "}
                  <span className="font-semibold">{data.eventLocation}</span>.
                  Compete for glory and a chance to win the grand prize!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default Details;

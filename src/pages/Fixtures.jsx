import React, { useEffect, useRef, useState } from "react";
import { FaTrophy, FaCalendarAlt, FaClock } from "react-icons/fa";
import Header from "../components/Header";
import AppFooter from "../components/Footer";
import { FaDownload } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { getfixtureCompetitionAPI } from "../services/allAPIs";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
function Fixtures() {
  const printRef = useRef();
  const [fixtureDetails, setFixtureDetails] = useState(null);
  const { id } = useParams();

  const getfixtureCompetition = async (id) => {
    try {
      const result = await getfixtureCompetitionAPI(id);
      if (result.status === 200) {
        setFixtureDetails(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getfixtureCompetition(id);
  }, [id]);
  //get rounds
  function getRoundLabel(round, totalRounds) {
    if (round === 1) return "First Round";
    if (totalRounds === 3) {
      if (round === 2) return "Semi-Finals";
      if (round === 3) return "Final";
    }
    if (totalRounds === 4) {
      if (round === 2) return "Quarter-Finals";
      if (round === 3) return "Semi-Finals";
      if (round === 4) return "Final";
    }
    if (totalRounds === 5) {
      if (round === 2) return "Round of 16";
      if (round === 3) return "Quarter-Finals";
      if (round === 4) return "Semi-Finals";
      if (round === 5) return "Final";
    }
    return `Round ${round}`;
  }
  //for displaying rounds in different grids
  function getGridClass(round, totalRounds) {
    if (totalRounds === 3 && round === 3) return "max-w-2xl mx-auto";
    if (totalRounds === 4 && round === 4) return "max-w-2xl mx-auto";
    if (totalRounds === 5 && round === 5) return "max-w-2xl mx-auto";
    if (totalRounds === 4 && round === 3) return "md:grid-cols-2 gap-6";
    if (totalRounds === 5 && round === 4) return "md:grid-cols-2 gap-6";
    if (totalRounds === 5 && round === 3) return "md:grid-cols-4 gap-6";
    return "md:grid-cols-4 gap-6";
  }
  // Group fixtures by round for display
  const groupFixturesByRound = (fixtures) => {
    const rounds = {};
    fixtures.forEach((f) => {
      if (!rounds[f.round]) rounds[f.round] = [];
      rounds[f.round].push(f);
    });
    return rounds;
  };
  console.log(fixtureDetails);
  //save pdf
  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("fixtures.pdf");
  };
  return (
    <div>
      <Header />
      <div
        ref={printRef}
        className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
            Fixtures & Results
          </h1>
          <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          <div className="flex justify-end items-center my-5">
            <FaDownload
              onClick={handleDownloadPDF}
              className="text-indigo-500 text-2xl mr-5 cursor-pointer"
            />
          </div>
        </div>

        {fixtureDetails ? (
          fixtureDetails.fixtures && fixtureDetails.fixtures.length > 0 ? (
            <div className="max-w-6xl mx-auto space-y-16">
              {Object.entries(
                groupFixturesByRound(fixtureDetails.fixtures)
              ).map(([round, matches]) => (
                <div key={round}>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    {round == fixtureDetails.numberOfRounds ? (
                      <FaTrophy className="mr-2 text-yellow-600" />
                    ) : (
                      <FaCalendarAlt className="mr-2 text-green-600" />
                    )}
                    {getRoundLabel(
                      Number(round),
                      fixtureDetails.numberOfRounds
                    )}
                  </h2>

                  <div
                    className={`grid ${getGridClass(
                      Number(round),
                      fixtureDetails.numberOfRounds
                    )}`}
                  >
                    {matches.map((match) => {
                      const isCompleted =
                        match.scoreA !== null &&
                        match.scoreB !== null &&
                        !(match.scoreA === 0 && match.scoreB === 0);
                      return (
                        <div
                          key={match._id}
                          className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                            round == fixtureDetails.numberOfRounds
                              ? "border-2 border-yellow-400"
                              : ""
                          }`}
                        >
                          <div
                            className={`p-4 border-b border-gray-200 ${
                              round == fixtureDetails.numberOfRounds
                                ? "bg-yellow-50"
                                : "bg-gray-50"
                            }`}
                          >
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                isCompleted
                                  ? "text-green-600 bg-green-100"
                                  : "text-blue-600 bg-blue-100"
                              }`}
                            >
                              {isCompleted ? "Match Completed" : "Upcoming"}
                            </span>
                          </div>

                          <div className="p-4">
                            {/* Team A */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={`http://localhost:3000/uploads/${match.teamA.logo[0]}`}
                                  alt={match.teamA.name}
                                  className="h-8 w-8 object-contain"
                                />
                                <span className="font-medium">
                                  {match.teamA.name}
                                </span>
                              </div>
                              <span
                                className={`font-bold ${
                                  match.scoreA > match.scoreB
                                    ? "text-green-700"
                                    : ""
                                }`}
                              >
                                {isCompleted ? match.scoreA : "-"}
                              </span>
                            </div>

                            {/* Team B */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={`http://localhost:3000/uploads/${match.teamB.logo[0]}`}
                                  alt={match.teamB.name}
                                  className="h-8 w-8 object-contain"
                                />
                                <span className="font-medium">
                                  {match.teamB.name}
                                </span>
                              </div>
                              <span
                                className={`font-bold ${
                                  match.scoreB > match.scoreA
                                    ? "text-green-700"
                                    : ""
                                }`}
                              >
                                {isCompleted ? match.scoreB : "-"}
                              </span>
                            </div>

                            {/* Date & Time */}
                            <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500 flex items-center">
                              <FaClock className="mr-1" />
                              <span>
                                {new Date(match.date).toDateString()} -{" "}
                                {match.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Fixtures not scheduled yet
            </p>
          )
        ) : (
          <p className="text-center text-gray-600">Loading fixtures...</p>
        )}
      </div>
      <AppFooter />
    </div>
  );
}

export default Fixtures;

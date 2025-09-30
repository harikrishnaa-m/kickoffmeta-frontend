import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  getACompetitionAPI,
  addFixtureAPI,
  removeFixtureAPI,
  updateFixtureAPI,
  updateFixtureScoreAPI,
} from "../../services/allAPIs";

// to get matches per round for knockout
const getRoundsAndMatches = (numTeams) => {
  const rounds = [];
  let teams = numTeams;
  while (teams > 1) {
    rounds.push(teams / 2);
    teams = teams / 2;
  }
  return rounds;
};

function FixtureOrganizer() {
  const { id } = useParams();

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fixtures, setFixtures] = useState([]);
  const [message, setMessage] = useState("");
  const [scoreModal, setScoreModal] = useState({
    open: false,
    roundIdx: null,
    matchIdx: null,
  });
  const [scoreA, setScoreA] = useState("");
  const [scoreB, setScoreB] = useState("");

  //   fetcher
  const fetchFixtures = async () => {
    const res = await getACompetitionAPI(id);
    if (res.data && res.data.acceptedTeams) {
      setTeams(res.data.acceptedTeams);
      const numTeams = res.data.acceptedTeams.length;
      const rounds = getRoundsAndMatches(numTeams);

      const scheduledFixtures = res.data.fixtures || [];
      const mergedFixtures = rounds.map((numMatches, roundIdx) => {
        const roundScheduled = scheduledFixtures.filter(
          (f) => f.round === roundIdx + 1
        );
        return Array.from({ length: numMatches }, (_, i) =>
          roundScheduled[i]
            ? {
                round: roundIdx + 1,
                teamA: roundScheduled[i].teamA,
                teamB: roundScheduled[i].teamB,
                date: roundScheduled[i].date?.slice(0, 10) || "",
                time: roundScheduled[i].time || "",
                scheduled: true,
                _id: roundScheduled[i]._id,
                scoreA: roundScheduled[i].scoreA ?? "",
                scoreB: roundScheduled[i].scoreB ?? "",
              }
            : {
                round: roundIdx + 1,
                teamA: "",
                teamB: "",
                date: "",
                time: "",
                scheduled: false,
                scoreA: "",
                scoreB: "",
              }
        );
      });

      setFixtures(mergedFixtures);
    }
    setLoading(false);
  };

  //  initial load
  useEffect(() => {
    fetchFixtures();
  }, [id]);

  //to prevent duplicate team selection in a round
  const getUsedTeamIds = (roundFixtures, excludeIdx) => {
    const used = [];
    roundFixtures.forEach((fixture, idx) => {
      if (idx !== excludeIdx) {
        if (fixture.teamA) used.push(fixture.teamA);
        if (fixture.teamB) used.push(fixture.teamB);
      }
    });
    return used;
  };

  //  for scheduling a match
  const handleScheduleMatch = async (roundIdx, matchIdx) => {
    const fixture = fixtures[roundIdx][matchIdx];
    const { teamA, teamB, date, time } = fixture;
    if (!teamA || !teamB || !date || !time) {
      setMessage("Please select teams, date, and time.");
      return;
    }
    if (teamA === teamB) {
      setMessage("Team A and Team B must be different.");
      return;
    }
    const res = await addFixtureAPI({
      competitionId: id,
      round: roundIdx + 1,
      teamA,
      teamB,
      date,
      time,
    });
    if (res.data) {
      setMessage("Fixture scheduled successfully!");
      await fetchFixtures(); // refresh
    } else {
      setMessage("Error scheduling fixture.");
    }
  };

  // for updating fixture state
  const handleFixtureChange = (roundIdx, matchIdx, field, value) => {
    const updated = [...fixtures];
    updated[roundIdx][matchIdx][field] = value;
    setFixtures(updated);
  };

  //  for updating a scheduled fixture
  const handleUpdateFixture = async (roundIdx, matchIdx) => {
    const fixture = fixtures[roundIdx][matchIdx];
    const { teamA, teamB, date, time, _id } = fixture;
    if (!teamA || !teamB || !date || !time) {
      setMessage("Please select teams, date, and time.");
      return;
    }
    if (teamA === teamB) {
      setMessage("Team A and Team B must be different.");
      return;
    }
    const res = await updateFixtureAPI({
      competitionId: id,
      fixtureId: _id,
      teamA,
      teamB,
      date,
      time,
    });
    if (res.data) {
      setMessage("Fixture updated successfully!");
      await fetchFixtures();
    } else {
      setMessage("Error updating fixture.");
    }
  };

  //  for resetting a fixture
  const handleReset = async (roundIdx, matchIdx) => {
    const fixture = fixtures[roundIdx][matchIdx];
    if (fixture.scheduled && fixture._id) {
      await removeFixtureAPI({
        competitionId: id,
        fixtureId: fixture._id,
      });
    }
    await fetchFixtures();
    setMessage("");
  };

  // Get winners of a round
  const getRoundWinners = (roundFixtures) =>
    roundFixtures
      .filter((f) => f.scheduled && f.scoreA !== "" && f.scoreB !== "")
      .map((f) => {
        if (Number(f.scoreA) > Number(f.scoreB)) return f.teamA;
        if (Number(f.scoreB) > Number(f.scoreA)) return f.teamB;
        return null;
      })
      .filter(Boolean);

  // Filter teams for next round
  const getSelectableTeams = (roundIdx) => {
    if (roundIdx === 0) return teams;
    const prevWinners = getRoundWinners(fixtures[roundIdx - 1]);
    return teams.filter((t) => prevWinners.includes(t._id));
  };

  // Open score modal
  const handleOpenScoreModal = (roundIdx, matchIdx) => {
    const fixture = fixtures[roundIdx][matchIdx];
    setScoreA(fixture.scoreA ?? "");
    setScoreB(fixture.scoreB ?? "");
    setScoreModal({ open: true, roundIdx, matchIdx });
  };

  // Update score
  const handleUpdateScore = async () => {
    const { roundIdx, matchIdx } = scoreModal;
    const fixture = fixtures[roundIdx][matchIdx];
    if (fixture._id) {
      const res = await updateFixtureScoreAPI({
        competitionId: id,
        fixtureId: fixture._id,
        scoreA: Number(scoreA),
        scoreB: Number(scoreB),
      });
      if (res.data) {
        setMessage("Score updated!");
        await fetchFixtures();
      } else {
        setMessage("Error updating score.");
      }
    }
    setScoreModal({ open: false, roundIdx: null, matchIdx: null });
  };

  return (
    <div>
      <div className="max-w-[90%] mx-auto px-4 py-8">
        {/* Back Button */}
        <button className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <Link className="flex items-center" to="/organizerdashboard">
            <FaArrowLeft className="mr-2" />
            Back
          </Link>
        </button>

        {/* Card Container */}
        <div className="bg-white p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Match Schedule
            </h1>
            <p className="text-gray-600">
              Pair teams and assign match details for your tournament
            </p>
          </div>
          <div className="shadow-lg rounded-2xl border border-gray-200 overflow-scroll h-150 p-5 pt-10 px-10">
            {loading ? (
              <p>Loading teams...</p>
            ) : (
              fixtures.map((roundFixtures, roundIdx) => (
                <div
                  key={roundIdx}
                  className="space-y-6 border border-gray-400 rounded p-5 mb-4"
                >
                  <p className="text-blue-700 ms-1 font-semibold text-center">
                    Round {roundIdx + 1}
                  </p>
                  {roundFixtures.map((fixture, matchIdx) => (
                    <div
                      key={matchIdx}
                      className="p-6 border border-gray-200 rounded-xl bg-gray-50 flex flex-col md:flex-row items-center gap-4"
                    >
                     
                      <select
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                        value={fixture.teamA}
                        onChange={(e) =>
                          handleFixtureChange(
                            roundIdx,
                            matchIdx,
                            "teamA",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select Team A</option>
                        {getSelectableTeams(roundIdx)
                          .filter((team) => {
                            const used = getUsedTeamIds(
                              fixtures[roundIdx],
                              matchIdx
                            );
                            return (
                              !used.includes(team._id) &&
                              team._id !== fixture.teamB
                            );
                          })
                          .map((team) => (
                            <option key={team._id} value={team._id}>
                              {team.name}
                            </option>
                          ))}
                      </select>
                      <span className="font-semibold text-gray-500">vs</span>
                      <select
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                        value={fixture.teamB}
                        onChange={(e) =>
                          handleFixtureChange(
                            roundIdx,
                            matchIdx,
                            "teamB",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select Team B</option>
                        {getSelectableTeams(roundIdx)
                          .filter((team) => {
                            const used = getUsedTeamIds(
                              fixtures[roundIdx],
                              matchIdx
                            );
                            return (
                              !used.includes(team._id) &&
                              team._id !== fixture.teamA
                            );
                          })
                          .map((team) => (
                            <option key={team._id} value={team._id}>
                              {team.name}
                            </option>
                          ))}
                      </select>
                      <input
                        type="date"
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                        value={fixture.date}
                        onChange={(e) =>
                          handleFixtureChange(
                            roundIdx,
                            matchIdx,
                            "date",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="time"
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                        value={fixture.time}
                        onChange={(e) =>
                          handleFixtureChange(
                            roundIdx,
                            matchIdx,
                            "time",
                            e.target.value
                          )
                        }
                      />
                      <div className="flex gap-2">
                        {!fixture.scheduled ? (
                          <button
                            onClick={() =>
                              handleScheduleMatch(roundIdx, matchIdx)
                            }
                            className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-lg"
                          >
                            Schedule Match
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateFixture(roundIdx, matchIdx)
                              }
                              className="bg-green-600 text-white px-4 py-2 cursor-pointer rounded-lg"
                            >
                              Update
                            </button>
                            <button
                              onClick={() =>
                                handleOpenScoreModal(roundIdx, matchIdx)
                              }
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                            >
                              Set Score
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => handleReset(roundIdx, matchIdx)}
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
            {message && (
              <p className="text-center text-green-600 font-semibold mt-2">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Score Modal */}
      {scoreModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-xl text-center font-bold mb-4">Set Score</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">
                  {teams.find(
                    (t) =>
                      t._id ===
                      fixtures[scoreModal.roundIdx][scoreModal.matchIdx].teamA
                  )?.name || "Team A"}
                </span>
                <span className="font-bold text-gray-600">vs</span>
                <span className="font-semibold">
                  {teams.find(
                    (t) =>
                      t._id ===
                      fixtures[scoreModal.roundIdx][scoreModal.matchIdx].teamB
                  )?.name || "Team B"}
                </span>
              </div>
              <div className="flex max-w-full gap-5">
                {" "}
                <input
                  type="number"
                  min="0"
                  className="w-1/2 border px-4 py-2 rounded text-center"
                  placeholder="Score for Team A"
                  value={scoreA}
                  onChange={(e) => setScoreA(e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  className=" w-1/2 border px-4 py-2 rounded text-center"
                  placeholder="Score for Team B"
                  value={scoreB}
                  onChange={(e) => setScoreB(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() =>
                  setScoreModal({ open: false, roundIdx: null, matchIdx: null })
                }
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleUpdateScore}
              >
                Update Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FixtureOrganizer;

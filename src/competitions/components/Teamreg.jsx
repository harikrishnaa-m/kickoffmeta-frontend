import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import {
  addActiveCompetitionToTeamAPI,
  addTeamAPI,
  createCheckoutSession1API,
  registerTeamToCompetitionAPI,
} from "../../services/allAPIs";
import { loadStripe } from "@stripe/stripe-js";

function TeamRegistrationFlow({ competitionId, title, entryFee }) {
  console.log(title, entryFee);

  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(1);
  const [team, setTeam] = useState({ name: "", captain: "", logo: null });
  const [preview, setPreview] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [token, setToken] = useState("");
  const onCloseModal = () => {
    setOpenModal(false);
    setStep(1);
    setTeam({ name: "", captain: "", logo: null });
    setPreview(null);
    setAgreed(false);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setTeam((prev) => ({ ...prev, logo: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);
  console.log(token);

  const handleReset = () => {
    setTeam({ name: "", captain: "", logo: null });
    setPreview(null);
    setAgreed(false);
  };
  console.log(team);
  const handleConfirmAndPay = async () => {
    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("name", team.name);
      formData.append("captain", team.captain);
      if (team.logo) {
        formData.append("logo", team.logo);
      }

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await addTeamAPI(formData, reqHeader);

      // Check for team already exists
      if (result.status == 208) {
        sessionStorage.setItem("teamDetails", JSON.stringify(result.data));
        const teamDetails = JSON.parse(sessionStorage.getItem("teamDetails"));

        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const res = await registerTeamToCompetitionAPI(
          { competitionId, teamId: teamDetails._id },
          reqHeader
        );
        if (res.status === 409) {
          alert("Team already registered for this competition.");
          return; // Stop further execution
        }
        await addActiveCompetitionToTeamAPI(
          { teamId: teamDetails._id, competitionId },
          reqHeader
        );
        alert(
          "Team already existing..Registered Successfully..Proceeding to payment"
        );
        // 2. Start Stripe payment
        const stripe = await loadStripe(
          "pk_test_51RuT9W2MMbUr2oAY3g6FJ5pQJZtMGQR36IYZsUGdUfzxOy8Ts08CmuEgBZsVZT5PBDJYuUp9WAb3uyYMHINlwcmO00UoWhCKKL"
        );

        const session = await createCheckoutSession1API({
          amount: entryFee * 100,
          title,
          // Optionally, you can pass the competition ID here for later verification
          // competitionId: result.data._id
        });

        if (session?.data?.id) {
          await stripe.redirectToCheckout({ sessionId: session.data.id });
        } else {
          alert("Failed to create checkout session");
          console.error("Stripe session creation response:", session);
        }
      } else if (result.status === 200) {
        // Store team details (including _id) in sessionStorage
        sessionStorage.setItem("teamDetails", JSON.stringify(result.data));
        alert("Team registered successfully!");
        const teamDetails = JSON.parse(sessionStorage.getItem("teamDetails"));

        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const res = await registerTeamToCompetitionAPI(
          { competitionId, teamId: teamDetails._id },
          reqHeader
        );
        if (res.status === 409) {
          alert("Team already registered for this competition.");
          return; // Stop further execution
        }
        await addActiveCompetitionToTeamAPI(
          { teamId: teamDetails._id, competitionId },
          reqHeader
        );
        // 2. Start Stripe payment
        const stripe = await loadStripe(
          "pk_test_51RuT9W2MMbUr2oAY3g6FJ5pQJZtMGQR36IYZsUGdUfzxOy8Ts08CmuEgBZsVZT5PBDJYuUp9WAb3uyYMHINlwcmO00UoWhCKKL"
        );

        const session = await createCheckoutSession1API({
          amount: entryFee * 100,
          title,
          // Optionally, you can pass the competition ID here for later verification
          // competitionId: result.data._id
        });

        if (session?.data?.id) {
          await stripe.redirectToCheckout({ sessionId: session.data.id });
        } else {
          alert("Failed to create checkout session");
          console.error("Stripe session creation response:", session);
        }
        onCloseModal();
      } else {
        alert(result.data || "Failed to register team.");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div>
      <Button
        className="mt-4 px-8 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 focus:ring-4 focus:ring-indigo-300"
        onClick={() => setOpenModal(true)}
      >
        <FaTrophy /> Register Now
      </Button>

      <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
        <ModalHeader className="bg-white text-black text-center border-b border-gray-200">
          <p className="text-2xl font-bold text-gray-900 tracking-tight">
            {step === 1 ? "Team Details" : "Confirm Team"}
          </p>
        </ModalHeader>

        <ModalBody className="bg-white text-black p-6">
          <div className="flex flex-col space-y-4">
            {/* Step 1: Registration Form */}
            {step === 1 && (
              <>
                <div>
                  <label
                    htmlFor="teamname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamname"
                    value={team.name}
                    onChange={(e) =>
                      setTeam((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    placeholder="Enter team name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="captain"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Captain
                  </label>
                  <input
                    type="text"
                    id="captain"
                    value={team.captain}
                    onChange={(e) =>
                      setTeam((prev) => ({ ...prev, captain: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 text-gray-900"
                    placeholder="Enter captain's name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="logo"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 hover:border-indigo-500">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          preview
                            ? preview
                            : "https://cdn-icons-png.freepik.com/256/4240/4240224.png?semt=ais_hybrid"
                        }
                        alt="Team logo preview"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center">
                        <span className="text-white text-sm">Upload Logo</span>
                      </div>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      id="logo"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!team.name || !team.captain}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Confirmation */}
            {step === 2 && (
              <>
                <div className="flex flex-col items-center space-y-10">
                  <div className="flex flex-col space-y-10 items-start">
                    <p className="text-gray-800 text-xl">
                      <strong>Team Name:</strong> {team.name}
                    </p>
                    <p className="text-gray-800 text-xl">
                      <strong>Captain:</strong> {team.captain}
                    </p>
                  </div>

                  <div className="mt-2">
                    <img
                      src={
                        preview
                          ? preview
                          : "https://cdn-icons-png.freepik.com/256/4240/4240224.png?semt=ais_hybrid"
                      }
                      alt="Team Logo"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    />
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <input
                      className="scale-150"
                      id="tandc"
                      name="tandc"
                      type="checkbox"
                      checked={agreed}
                      onChange={() => setAgreed((prev) => !prev)}
                    />
                    <label htmlFor="tandc">
                      I hereby confirm that all the details provided above are
                      accurate and true to the best of my knowledge.
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
                    type="button"
                    disabled={!agreed}
                    onClick={handleConfirmAndPay}
                  >
                    Confirm & Pay
                  </button>
                </div>
              </>
            )}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default TeamRegistrationFlow;

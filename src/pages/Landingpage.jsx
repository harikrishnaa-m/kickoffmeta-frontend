import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GiSoccerKick } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { BiJoystick } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { RiFileExcel2Fill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { FaTrophy } from "react-icons/fa";
import { MdScoreboard } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { MdOutlineBroadcastOnHome } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { sendEmailAPI } from "../services/allAPIs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Landingpage({ active, setActive }) {
  const navigate = useNavigate();
  console.log("active:", active);
  //brochure senging via email
  const [email, setEmail] = useState("");

  const handleClick = async () => {
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    try {
      const res = await sendEmailAPI({ email });

      if (res?.data?.success) {
        toast.success("Brochure sent to your email!");
        setEmail("");
      } else {
        toast.error(res?.data?.error || "Failed to send email.");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };

  //ui
  const [brochure, setBrochure] = useState(0);
  const [faqs, setFaqs] = useState(0);
  const handleFaqs0 = () => {
    if (faqs != 1) {
      setFaqs(1);
    } else {
      setFaqs(0);
    }
  };
  const handleFaqs1 = () => {
    if (faqs != 2) {
      setFaqs(2);
    } else {
      setFaqs(0);
    }
  };
  const handleFaqs2 = () => {
    if (faqs != 3) {
      setFaqs(3);
    } else {
      setFaqs(0);
    }
  };
  const handleFaqs3 = () => {
    if (faqs != 4) {
      setFaqs(4);
    } else {
      setFaqs(0);
    }
  };
  const handleFaqs4 = () => {
    if (faqs != 5) {
      setFaqs(5);
    } else {
      setFaqs(0);
    }
  };
  const handleBrochure = () => {
    if (brochure != 1) {
      setBrochure(1);
    } else {
      setBrochure(0);
    }
  };
  const [pricing, setPricing] = useState(0);
  const handlePricing = () => {
    if (pricing != 0) {
      setPricing(0);
    } else {
      setPricing(1);
    }
  };
  const [preloader, setPreloader] = useState(0);
  const [caro, setCaro] = useState(0);
  const handleCaro1 = () => {
    if (caro != 0) {
      setCaro((prev) => prev - 1);
    }
  };
  const handleCaro2 = () => {
    if (caro != 4) {
      setCaro((prev) => prev + 1);
    }
  };
  console.log(caro);

  useEffect(() => {
    setTimeout(() => {
      setPreloader(1);
    }, 3470);
  }, []);
  useEffect(() => {
    setActive(0);
  }, []);

  return (
    <div>
      {preloader == 1 ? (
        <div>
          <Header active={active} />
          <div className="flex flex-col min-h-screen ">
            {/* hero section */}
            <section className="flex flex-col items-center justify-center ">
              <div className="flex">
                <div className="flex flex-col  items-center justify-start w-2/5">
                  <img
                    className="h-[36rem] min-w-full rounded-br-full mr-14"
                    src="https://cdn.vox-cdn.com/thumbor/WSVnVid7m9aS7e2xTZmsET2aVI4=/0x0:4725x3150/1200x800/filters:focal(1988x619:2744x1375)/cdn.vox-cdn.com/uploads/chorus_image/image/73732947/2185519423.0.jpg"
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-start justify-start w-3/5">
                  <div className="flex space-x-4 mt-12">
                    <button className="bg-red-600 p-2 text-white rounded-full flex items-center">
                      <IoIosFootball />
                      Sports
                    </button>
                    <button className="bg-red-600 p-2 text-white rounded-full flex items-center">
                      <BiJoystick />
                      ESports
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-6xl font-bold">Plan your next</p>
                    <p className="text-6xl font-bold">
                      <span>football</span> tournament
                    </p>
                    <p className="text-6xl font-bold">with KickOff Meta</p>
                  </div>
                  <div className="mt-5 space-y-2">
                    <p className="flex items-center text-xl font-semibold">
                      <TiTick className="text-blue-500 text-4xl bg-blue-50 rounded-full mr-1" />{" "}
                      Quick and easy match scheduler
                    </p>
                    <p className="flex items-center text-xl font-semibold">
                      <TiTick className="text-blue-500 text-4xl bg-blue-50 rounded-full mr-1" />{" "}
                      Engaging Live Tournament Updates
                    </p>
                    <p className="flex items-center text-xl font-semibold">
                      <TiTick className="text-blue-500 text-4xl bg-blue-50 rounded-full mr-1" />{" "}
                      Online registration page
                    </p>
                  </div>
                  <div className="mt-5">
                    <button
                      onClick={() => {
                        const existingUser = JSON.parse(
                          sessionStorage.getItem("existingUser")
                        );
                        if (existingUser) {
                          const role = existingUser.role;
                          if (role == "organizer") {
                            navigate("/organizerdashboard");
                          } else {
                            alert("Login as Organizer");
                          }
                        } else {
                          navigate("/register");
                        }
                      }}
                      className="text-white transition duration-300 hover:scale-105 shadow-3xl font-semibold text-4xl bg-red-600 hover:bg-red-700 p-2 rounded-lg cursor-pointer outline-1 outline-neutral-950/10"
                    >
                      Start Your Tournament Today!
                    </button>
                    <p className="text-blue-500 mt-2 font-semibold">
                      Trusted by 10,000+ Organizers
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* participate */}
            <section className="flex-flex-col items-center justify-center">
              <div className="flex">
                <div className="w-3/5 mr-2">
                  <div className="flex flex-col items-end pr-2 mt-20">
                    <p className="text-6xl font-bold">Dominate the Pitch</p>
                    <p className="text-6xl font-bold">Claim your epic</p>
                    <p className="text-6xl font-bold text-red-600">Reward!</p>
                  </div>
                  <div className="mt-5 flex flex-col items-end space-y-2">
                    <p className="flex items-center text-xl font-semibold">
                      <TiTick className="text-blue-500 text-4xl bg-blue-50 rounded-full mr-1" />{" "}
                      Compete in Exciting Tournaments
                    </p>
                    <p className="flex items-center text-xl font-semibold mr-18">
                      <TiTick className="text-blue-500 text-4xl bg-blue-50 rounded-full mr-1" />{" "}
                      Win Exclusive Prizes Galore
                    </p>
                    <p className="flex items-center text-xl font-semibold mr-2">
                      <TiTick className="text-blue-500 text-4xl bg-blue-50 rounded-full mr-1" />{" "}
                      Seamless & Engaging Experience
                    </p>
                  </div>
                  <div className="mt-5 flex flex-col items-end">
                    <button
                      onClick={() => navigate("/competitions")}
                      className="text-white transition duration-300 hover:scale-105 shadow-3xl font-semibold text-4xl bg-red-600 hover:bg-red-700 p-2 rounded-lg cursor-pointer outline-1 outline-neutral-950/10"
                    >
                      Browse Competitions & Prizes
                    </button>
                    <p className="text-blue-500 mt-2 font-semibold">
                      Join 1,000,000+ Players
                    </p>
                  </div>
                </div>
                <div className="w-2/5">
                  <img
                    className="w-full h-[40rem] rounded-l-full
 "
                    src="https://i.guim.co.uk/img/media/982167da8d10697f8544d0706f470fc4b02a5c30/0_326_5567_3340/master/5567.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5a696e1ffca2feff80356dd6a976040a"
                    alt=""
                  />
                </div>
              </div>
            </section>
            {/* no more excel */}
            <section className="flex flex-col items-center justify-center">
              <div className="flex flex-col w-300 my-10 p-5 items-center justify-center bg-violet-50 space-y-4">
                <h1 className="text-6xl font-bold">No More Excel</h1>
                <p className="text-lg font-semibold">
                  KickOff Meta is an easy to use web app to manage your
                  tournament: from registration to the award ceremony
                </p>
                <div className="flex  bg-white rounded p-3 my-2 w-200">
                  <p className="text-white text-center bg-blue-400 h-7 w-7 text-lg font-bold rounded-full mx-2">
                    1
                  </p>
                  <div>
                    <p className="text-lg font-semibold">Manage teams</p>
                    <p className="text-lg">
                      Add teams manually or open an online registration page in
                      minutes
                    </p>
                  </div>
                </div>
                <div className="flex  bg-white rounded p-3 my-2 w-200">
                  <p className="text-white text-center bg-blue-400 h-7 w-7 text-lg font-bold rounded-full mx-2">
                    2
                  </p>
                  <div>
                    <p className="text-lg font-semibold">Pick your format</p>
                    <p className="text-lg">
                      Combine groups, brackets & single matches to create your
                      ideal tournament setup
                    </p>
                  </div>
                </div>
                <div className="flex  bg-white rounded p-3 my-2 w-200">
                  <p className="text-white text-center bg-blue-400 h-7 w-7 text-lg font-bold rounded-full mx-2">
                    3
                  </p>
                  <div>
                    <p className="text-lg font-semibold">Create schedules</p>
                    <p className="text-lg">
                      Plan matches automatically using our scheduling tool and
                      simply drag and drop to make changes
                    </p>
                  </div>
                </div>
                <div className="flex  bg-white rounded p-3 my-2 w-200">
                  <p className="text-white text-center bg-blue-400 h-7 w-7 text-lg font-bold rounded-full mx-2">
                    4
                  </p>
                  <div>
                    <p className="text-lg font-semibold">Keep scores</p>
                    <p className="text-lg">
                      Process results effortlessly from any device and everyone
                      is up to date
                    </p>
                  </div>
                </div>
                <div className="w-0 h-0">
                  <RiFileExcel2Fill className="text-[15rem] text-green-600 relative bottom-100 left-120 " />
                  <RxCross1 className="text-[20rem]  text-red-700 relative bottom-170 left-110  " />
                </div>
              </div>
            </section>
            {/* organiser */}
            <section className="flex flex-col items-center justify-center my-5 mb-40">
              <div className="w-300 p-5">
                <h1 className="text-center mb-10">
                  Over 50,000 organisers from 50 disciplines, ranging from
                  amateurs to professionals
                </h1>
                <div className="flex items-center justify-center space-x-10 ">
                  <img
                    className="h-25 hover:opacity-75"
                    src="https://www.tournifyapp.com/static/b3af62e7efa3781e96e06e3e34665d9c/d399c/knvb-logo-min.png"
                    alt=""
                  />
                  <img
                    className="h-25 hover:opacity-75"
                    src="https://www.tournifyapp.com/static/52f048b1b0b6572c86d9dcfacba4a8a6/d399c/background-1-min.png"
                    alt=""
                  />
                  <img
                    className="h-25 hover:opacity-75"
                    src="https://www.tournifyapp.com/static/c065f21451ac0d4fe9c864c46802770c/d399c/ajax-logo-col-min.png"
                    alt=""
                  />
                  <img
                    className="h-25 hover:opacity-75"
                    src="https://www.tournifyapp.com/static/007fa43e65f5cecb613cf7d329c618a4/d399c/1200px-chelsea_fc.svg-min.png"
                    alt=""
                  />
                  <img
                    className="h-25 hover:opacity-75"
                    src="https://www.tournifyapp.com/static/1abed5a7722b2ff7df2e8b3fc6db75f9/d399c/background-2-min.png"
                    alt=""
                  />
                  <img
                    className="h-25 hover:opacity-75"
                    src="https://www.tournifyapp.com/static/830a9534c2a5396413ebd995540f0aa7/d399c/derby_county_f.c._logo.png"
                    alt=""
                  />
                  <img
                    className="h-25 hover:opacity-75"
                    src="https://www.tournifyapp.com/static/b8953afadf7100c5016cf5fc4fc68a15/d399c/logo-stvv-min.png"
                    alt=""
                  />
                  <img
                    className="h-25 hover:opacity-75"
                    src="https://www.tournifyapp.com/static/7b37cfe44e9688ebd33e195fb3a2199b/d399c/clublogo.png"
                    alt=""
                  />
                </div>
              </div>
            </section>
            <div className="flex flex-col items-center justify-center w-0 h-0">
              <div className="flex items-center relative left-200 justify-between w-300 bg-gradient-to-br from-black to-indigo-800  p-6 px-7 rounded-xl spaxe-y-5">
                <div>
                  <p className="text-white font-semibold text-xl">
                    Ready to be unburdened?
                  </p>
                  <p className="text-white font-semibold text-xl">
                    Create your KickOff Meta account now
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const existingUser = JSON.parse(
                        sessionStorage.getItem("existingUser")
                      );
                      if (existingUser) {
                        const role = existingUser.role;
                        if (role == "organizer") {
                          navigate("/organizerdashboard");
                        } else {
                          alert("Login as Organizer");
                        }
                      } else {
                        navigate("/register");
                      }
                    }}
                    className="flex items-center btn outline-1 outline-neutral-800 p-4 rounded cursor-pointer bg-white text-neutral-950 font-semibold hover:scale-103 transition duration-300 ease-in-out"
                  >
                    <FaTrophy className="mx-2 text-2xl" /> Create Your
                    Tournament
                  </button>
                </div>
              </div>
            </div>
            {/* Presentation */}
            <section className="flex flex-col items-center justify-center bg-gray-200  p-5">
              <div className="w-300 mt-30 pb-30">
                <p className="text-center text-4xl font-bold mb-4">
                  Its All About presentation
                </p>
                <p className="text-center text-lg text-gray-600 mb-10">
                  Communicate the match schedules, latest scores and live
                  standings with Tournify Live
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-1/2">
                    <img
                      src="https://www.tournifyapp.com/static/16e52c1e5ecb009929bd2a07e28252f0/34167/tournify-live-slideshow-en.png"
                      alt=""
                    />
                  </div>
                  <div className="w-1/2 space-y-5 ml-5">
                    <p className=" flex items-center text-lg font-bold">
                      <MdScoreboard className="text-4xl mr-2" />
                      Dynamic Live Scoreboards
                    </p>
                    <p className="text-lg text-gray-600">
                      Keep fans and players engaged with real-time score updates
                    </p>
                    <p className="flex items-center text-lg font-bold">
                      <FaTableList className="text-4xl mr-2" />
                      Instant Standings & Brackets
                    </p>
                    <p className="text-lg text-gray-600">
                      Show progression with automatically updated tournament
                      trees and rankings.
                    </p>
                    <p className="flex items-center text-lg font-bold">
                      <MdOutlineBroadcastOnHome className="text-4xl mr-2" />
                      Customizable Broadcast Views
                    </p>
                    <p className="text-lg text-gray-600">
                      Tailor the look and feel to match your brand or event
                      theme
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* testimonial */}
            <section className="flex flex-col items-center justify-center p-4">
              <div className="w-300  flex flex-col items-center justify-center space-y-5">
                <h1 className="text-4xl text-center font-bold mt-5">
                  What others say about KickOff Meta
                </h1>
                <p className="text-lg text-gray-600">
                  Find out some of the reasons our customers have to recommend
                  us
                </p>
                <div className="w-full flex justify-evenly items-center my-4">
                  <FaChevronLeft
                    className="text-4xl cursor-pointer"
                    onClick={handleCaro1}
                  />
                  {caro == 0 ? (
                    <div className="flex flex-col h-80 items-start justify-center p-8 shadow-lg w-100 space-y-3">
                      <p>
                        My experience with KickOff Meta was a game-changer. The
                        scheduling tools saved me countless hours and headaches,
                        making our league the best yet.
                      </p>
                      <div className="flex items-center space-x-2">
                        <img
                          className="h-20 rounded-full"
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                        <div>
                          <p className="font-semibold">Sarah Chen</p>
                          <p className="text-gray-500">
                            League Administrator at City United Youth Soccer
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {caro == 1 ? (
                    <div className="flex h-80 flex-col items-start justify-center p-8 shadow-lg w-100 space-y-3">
                      <p>
                        I can't imagine organizing a tournament without KickOff
                        Meta now. The live updates kept everyone informed and
                        truly elevated the experience for our fans and players.
                      </p>
                      <div className="flex items-center space-x-2">
                        <img
                          className="h-20  rounded-full"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                        <div>
                          <p className="font-semibold">David Lee</p>
                          <p className="text-gray-500">
                            Esports Event Manager at Pixel Power Gaming
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {caro == 2 ? (
                    <div className="flex h-80 flex-col items-start justify-center p-8 shadow-lg w-100 space-y-3">
                      <p>
                        KickOff Meta made our annual school cup a breeze. From
                        registration to final standings, everything was
                        incredibly smooth and professional.
                      </p>
                      <div className="flex items-center space-x-2">
                        <img
                          className="h-20 rounded-full"
                          src="https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                        <div>
                          <p className="font-semibold">Maria Garcia</p>
                          <p className="text-gray-500">
                            Athletic Director at Northwood High School
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {caro == 3 ? (
                    <div className="flex h-80 flex-col items-start justify-center p-8 shadow-lg w-100 space-y-5">
                      <p>
                        Absolutely brilliant! KickOff Meta's user-friendly
                        interface meant I could set up our competition quickly.
                        The participants loved the seamless registration
                        process.
                      </p>
                      <div className="flex items-center space-x-2">
                        <img
                          className="h-20  rounded-full"
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                        <div>
                          <p className="font-semibold">Tom Wilson</p>
                          <p className="text-gray-500">
                            Community Sports Coordinator at Parkside Recreation
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {caro == 4 ? (
                    <div className="flex h-80 flex-col items-start justify-center p-8 shadow-lg w-100 space-y-5">
                      <p>
                        Thanks to KickOff Meta, our charity tournament was a
                        huge success. The ability to manage teams and track
                        scores so easily allowed us to focus on the cause.
                      </p>
                      <div className="flex items-center space-x-2">
                        <img
                          className="h-20  rounded-full"
                          src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                        />
                        <div>
                          <p className="font-semibold">Jessica Brown</p>
                          <p className="text-gray-500">
                            Event Organizer at Kicking for a Cause Foundation
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <FaChevronRight
                    className="text-4xl cursor-pointer"
                    onClick={handleCaro2}
                  />
                </div>
              </div>
            </section>
            {/* pricing */}
            <section className="flex flex-col items-center justify-center bg-violet-50 p-5 pb-15">
              <div className="flex flex-col items-center justify-center w-300 space-y-5">
                <h1 className="text-4xl font-bold mt-5">Pricing</h1>
                <p className="text-gray-600 text-lg">
                  Find the Perfect Plan for Your Next Tournament
                </p>
                <div className="flex">
                  <button
                    onClick={handlePricing}
                    className={`${
                      pricing == 0
                        ? "btn bg-black text-white font-bold text-xl border-l border-y rounded-l p-2 cursor-pointer"
                        : "btn bg-white text-xl border-l border-y rounded-l p-2 cursor-pointer hover:text-white hover:bg-black"
                    }`}
                  >
                    Tournament
                  </button>
                  <button
                    onClick={handlePricing}
                    className={`${
                      pricing == 1
                        ? "btn bg-black text-white text-xl font-bold border-r border-y rounded-r p-2 cursor-pointer"
                        : "btn bg-white text-xl border-r border-y rounded-r p-2 cursor-pointer hover:text-white hover:bg-black"
                    }`}
                  >
                    Online
                  </button>
                </div>
                {pricing == 0 ? (
                  <div className="flex items-center justify-evenly space-x-4">
                    <div className="flex flex-col items-center justify-center bg-white shadow-xl p-3 rounded-xl space-y-5">
                      <p>Amateur</p>
                      <h1 className="flex items-center text-4xl font-bold">
                        <FaRupeeSign />
                        200
                      </h1>
                      <p className="text-gray-500">per tournament</p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        Upto 8 Teams
                      </p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        Penalty Shootouts
                      </p>
                      <button
                        onClick={() => {
                          const existingUser = JSON.parse(
                            sessionStorage.getItem("existingUser")
                          );
                          if (existingUser) {
                            const role = existingUser.role;
                            if (role == "organizer") {
                              navigate("/organizerdashboard");
                            } else {
                              alert("Login as Organizer");
                            }
                          } else {
                            navigate("/register");
                          }
                        }}
                        className="btn p-3 text-xl text-white bg-indigo-600 rounded-xl cursor-pointer hover:scale-102 transform duration-200"
                      >
                        Start Now
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-xl p-3 rounded-xl space-y-5">
                      <p>Professional</p>
                      <h1 className="flex items-center text-4xl font-bold">
                        <FaRupeeSign />
                        500
                      </h1>
                      <p className="text-gray-500">per tournament</p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        Upto 8 Teams
                      </p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        5-a-side Format
                      </p>
                      <button
                        onClick={() => {
                          const existingUser = JSON.parse(
                            sessionStorage.getItem("existingUser")
                          );
                          if (existingUser) {
                            const role = existingUser.role;
                            if (role == "organizer") {
                              navigate("/organizerdashboard");
                            } else {
                              alert("Login as Organizer");
                            }
                          } else {
                            navigate("/register");
                          }
                        }}
                        className="btn p-3 text-xl text-white bg-indigo-600 rounded-xl cursor-pointer hover:scale-102 transform duration-200"
                      >
                        Start Now
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-xl p-3 rounded-xl space-y-5">
                      <p>Worldclass</p>
                      <h1 className="flex items-center text-4xl font-bold">
                        <FaRupeeSign />
                        800
                      </h1>
                      <p className="text-gray-500">per tournament</p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        Upto 16 Teams
                      </p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        7-a-side Format
                      </p>
                      <button
                        onClick={() => {
                          const existingUser = JSON.parse(
                            sessionStorage.getItem("existingUser")
                          );
                          if (existingUser) {
                            const role = existingUser.role;
                            if (role == "organizer") {
                              navigate("/organizerdashboard");
                            } else {
                              alert("Login as Organizer");
                            }
                          } else {
                            navigate("/register");
                          }
                        }}
                        className="btn p-3 text-xl text-white bg-indigo-600 rounded-xl cursor-pointer hover:scale-102 transform duration-200"
                      >
                        Start Now
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-white shadow-xl p-3 rounded-xl space-y-5">
                      <p>Legendary</p>
                      <h1 className="flex items-center text-4xl font-bold">
                        <FaRupeeSign />
                        1000
                      </h1>
                      <p className="text-gray-500">per tournament</p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        Upto 32 Teams
                      </p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        11-a-side Format
                      </p>
                      <button
                        onClick={() => {
                          const existingUser = JSON.parse(
                            sessionStorage.getItem("existingUser")
                          );
                          if (existingUser) {
                            const role = existingUser.role;
                            if (role == "organizer") {
                              navigate("/organizerdashboard");
                            } else {
                              alert("Login as Organizer");
                            }
                          } else {
                            navigate("/register");
                          }
                        }}
                        className="btn p-3 text-xl text-white bg-indigo-600 rounded-xl cursor-pointer hover:scale-102 transform duration-200"
                      >
                        Start Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-evenly space-x-4">
                    <div className="flex flex-col items-center justify-center bg-white shadow-xl p-3 rounded-xl space-y-5">
                      <p>Beginner</p>
                      <h1 className="flex items-center text-4xl font-bold">
                        <FaRupeeSign />
                        200
                      </h1>
                      <p className="text-gray-500">per tournament</p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        Upto 8 Teams
                      </p>
                      <p className="flex items-center text-xl font-semibold">
                        <TiTick className="text-blue-500 text-xl bg-blue-50 rounded-full mr-1" />{" "}
                        K/O tournament
                      </p>
                      <button
                        onClick={() => {
                          const existingUser = JSON.parse(
                            sessionStorage.getItem("existingUser")
                          );
                          if (existingUser) {
                            const role = existingUser.role;
                            if (role == "organizer") {
                              navigate("/organizerdashboard");
                            } else {
                              alert("Login as Organizer");
                            }
                          } else {
                            navigate("/register");
                          }
                        }}
                        className="btn p-3 text-xl text-white bg-indigo-600 rounded-xl cursor-pointer hover:scale-102 transform duration-200"
                      >
                        Start Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center justify-center w-300 my-20 rounded-xl">
                <div className="flex justify-between items-center rounded-xl p-4 bg-white shadow-lg w-250">
                  <div>
                    <p className="text-lg font-semibold">Subscription</p>
                    <p>Do you organise 10+ tournaments each year?</p>
                    <p>
                      We now offer a yearly subscription. Unlimited tournaments.
                      Unlimited teams.
                    </p>
                  </div>
                  <button
                    onClick={handleBrochure}
                    className="bg-red-500 py-2 px-3 ml-4 text-white font-semibold cursor-pointer hover:bg-red-600 outline-white shadow rounded-xl text-2xl"
                  >
                    Request Brochure
                  </button>
                </div>
                {brochure == 1 && (
                  <div className="flex items-center justify-start bg-white w-250 shadow rounded-lg my-2 p-4">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="text"
                      placeholder="email address"
                      className="outline-1 outline-gray-200 rounded-l w-100 p-2 placeholder:text-gray-500"
                    />
                    <button
                      onClick={handleClick}
                      className="btn bg-indigo-500 text-white font-semibold px-2 py-2 rounded-r"
                    >
                      Request
                    </button>
                  </div>
                )}
              </div>
            </section>
            <section className="flex flex-col items-center justify-center bg-gray-200/70 p-10">
              <div className="flex flex-col items-center justify-center p-5 w-300 space-y-4">
                <h1 className="text-4xl font-bold mb-[4rem]">
                  Frequently Asked Questions (FAQs)
                </h1>
                <div className="flex flex-col items-start justify-start w-200 bg-white rounded-lg  space-y-2 p-4">
                  <p className="flex space-x-2 items-center justify-between w-full font-semibold">
                    What happens when my tournament is finished?{" "}
                    <MdKeyboardArrowDown
                      className="cursor-pointer"
                      onClick={handleFaqs0}
                    />
                  </p>
                  {faqs == 1 ? (
                    <p>
                      Your tournament and its public website will remain
                      visible. However, you'll need a new upgrade if you want to
                      organize a new edition of the tournament or another
                      tournament with more than 8 teams.
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col items-start justify-start w-200 bg-white rounded-lg space-y-2 p-4">
                  <p className="flex space-x-2 items-center justify-between w-full font-semibold">
                    Can I edit my tournament details after it has started?{" "}
                    <MdKeyboardArrowDown
                      className="cursor-pointer"
                      onClick={handleFaqs1}
                    />
                  </p>
                  {faqs == 2 ? (
                    <p>
                      You can make limited edits to your tournament details once
                      it has begun. Critical details like the number of teams or
                      tournament format may be locked to maintain fairness and
                      progress.
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start justify-start w-200 bg-white rounded-lg space-y-2 p-4">
                  <p className="flex space-x-2 items-center justify-between w-full font-semibold">
                    What if I need to cancel my tournament?{" "}
                    <MdKeyboardArrowDown
                      className="cursor-pointer"
                      onClick={handleFaqs2}
                    />
                  </p>
                  {faqs == 3 ? (
                    <p>
                      If you need to cancel your tournament, you can do so from
                      your dashboard. Participants will be notified, and the
                      tournament's public page will reflect the cancellation.
                      Please note our refund policy for any associated upgrade
                      costs.
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start justify-start w-200 bg-white rounded-lg space-y-2 p-4">
                  <p className="flex space-x-2 items-center justify-between w-full font-semibold">
                    How are results and standings updated during a tournament?
                    <MdKeyboardArrowDown
                      className="cursor-pointer"
                      onClick={handleFaqs3}
                    />
                  </p>
                  {faqs == 4 ? (
                    <p>
                      You can enter match results directly on your tournament
                      dashboard. Once results are entered, standings and
                      brackets will automatically update on the public website
                      in real-time, keeping everyone informed.
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start justify-start w-200 bg-white rounded-lg space-y-2 p-4">
                  <p className="flex space-x-2 items-center justify-between w-full font-semibold">
                    Is there a limit to how many tournaments I can organize?{" "}
                    <MdKeyboardArrowDown
                      className="cursor-pointer"
                      onClick={handleFaqs4}
                    />
                  </p>
                  {faqs == 5 ? (
                    <p>
                      There's no strict limit to the number of tournaments you
                      can organize. However, you'll need to make particular
                      purchases associated with each tournament.
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <img
            className="max-h-[20rem]"
            src="https://i.pinimg.com/originals/c7/ae/06/c7ae0615b9d39b2837dddfd98e63e42c.gif"
            alt=""
          />
        </div>
      )}
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
}

export default Landingpage;

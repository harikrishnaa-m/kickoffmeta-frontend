import React, { useEffect } from "react";
import Header from "../components/Header";
import {
  FaTrophy,
  FaChartLine,
  FaVideo,
  FaCamera,
  FaLightbulb,
  FaUsers,
  FaChartBar,
  FaUserShield,
} from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import AppFooter from "../components/Footer";

function About({ active, setActive }) {
  useEffect(() => {
    setActive(2);
  }, []);
  console.log(active);

  return (
    <div>
      <Header active={active} />
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <div className="relative h-120 overflow-hidden">
          {/* Blurred background image */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-xs"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516731566880-919c39006c9d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0')",
            }}
          ></div>

          {/* Foreground content */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                About KickOffMeta
              </h1>
              <p className="text-xl mt-2">
                Bridging grassroots football and next-gen tech to empower every
                player and tournament.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            Mission Statement
          </h2>
          <p className="text-lg text-gray-700 text-center">
            At KickOffMeta, our mission is to empower local football communities
            by providing powerful tools for tournament management, player
            analytics, and real-time updates. We strive to create a more
            transparent, data-driven, and inclusive football ecosystem at the
            grassroots level.
          </p>
        </section>

        {/* Our Story / Journey */}
        <section className="py-12 px-4 bg-violet-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">
              Our Story / Journey
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              KickOffMeta was born from a simple idea: to give small tournaments
              the same level of visibility and professionalism as large-scale
              leagues. Starting as a passion project among footballers and
              coders, we’ve evolved into a growing platform that supports over
              50+ community events across the region.
            </p>
            <ul className="list-none space-y-2 text-gray-700">
              <li className="flex items-center">
                <FaTrophy className="text-green-600 text-2xl mr-2" /> 2023:
                First local league hosted using KickOffMeta tools
              </li>
              <li className="flex items-center">
                <FaChartLine className="text-green-600 text-2xl mr-2" /> 2024:
                Integrated AI-driven player stats
              </li>
              <li className="flex items-center">
                <FaVideo className="text-green-600 text-2xl mr-2" /> 2025:
                Launched web dashboard and mobile support
              </li>
            </ul>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <FaTrophy className="text-indigo-600 text-5xl mr-2 mt-1" />{" "}
              Tournament Hosting: Create and manage knockout, league, or sevens
              formats with ease.
            </div>
            <div className="flex items-start">
              <FaChartBar className="text-indigo-600 text-5xl mr-2 mt-1" />{" "}
              Player Stats & Analytics: Track goals, assists, and performance
              metrics for each player.
            </div>
            <div className="flex items-start">
              <FaVideo className="text-indigo-600 text-5xl mr-2 mt-1" /> Live
              Match Updates: Real-time scores, highlights, and match feeds.
            </div>
            <div className="flex items-start">
              <FaCamera className="text-indigo-600 text-5xl mr-2 mt-1" /> Media
              & Highlights: Upload photos and video recaps for each game or
              tournament.
            </div>
          </div>
        </section>

        {/* Core Values / Principles */}
        <section className="py-12 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">
              Core Values / Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaLightbulb className="text-yellow-600 mr-2 text-3xl" />{" "}
                Innovation — We blend technology and sport to drive progress.
              </div>
              <div className="flex items-center">
                <FaUsers className="text-yellow-600 mr-2 text-3xl" /> Community
                — Built for the players, by the players.
              </div>
              <div className="flex items-center">
                <FaChartBar className="text-yellow-600 mr-2 text-3xl" />{" "}
                Transparency — Stats, scores, and systems are open and fair.
              </div>
              <div className="flex items-center">
                <FaTrophy className="text-yellow-600 mr-2 text-3xl" />{" "}
                Excellence — From UX to matchday, we never settle for average.
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-12 px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Meet the Team</h2>
          <div className="space-y-4">
            <div className=" ">
              <span className="min-w-fit font-semibold flex items-center">
                {" "}
                <FaUserShield className="text-blue-600 mr-2 text-3xl" /> Arthur
                Melo{" "}
              </span>{" "}
              Founder & Developer: A football lover with a passion for tech.
              Handles all things frontend & backend.
            </div>
            <div className=" ">
              <span className="min-w-fit font-semibold flex items-center">
                {" "}
                <FaUserShield className="text-blue-600 mr-2 text-3xl" /> Aitana
                Bonmati{" "}
              </span>{" "}
              Tournament Coordinator: On-ground expert with 5+ years of event
              management experience.
            </div>
            <div className="">
              <span className="min-w-fit font-semibold flex items-center">
                {" "}
                <FaUserShield className="text-blue-600 mr-2 text-3xl" /> Carlez
                Perez
              </span>{" "}
              UX Designer: Crafting interfaces that keep footballers connected
              and engaged.
            </div>
          </div>
        </section>

        {/* Achievements / Impact */}
        <section className="py-12 px-4 bg-gray-100">
          <div className="max-w-4xl flex flex-col items-center mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">
              Achievements / Impact
            </h2>
            <ul className="list-none space-y-2 text-gray-700">
              <li className="flex items-center">
                <FaTrophy className="text-green-600 mr-2 text-2xl" /> 50+
                Tournaments successfully hosted
              </li>
              <li className="flex items-center">
                <FaUsers className="text-green-600 mr-2 text-2xl" /> 1000+
                Registered players
              </li>
              <li className="flex items-center">
                <FaChartLine className="text-green-600 mr-2 text-2xl" /> 10K+
                Minutes of play tracked
              </li>
              <li className="flex items-center">
                <BsBuildingsFill className="text-green-600 mr-2 text-2xl" /> 5
                Cities using KickOffMeta for league events
              </li>
              <li className="flex items-center">
                <FaCamera className="text-green-600 mr-2 text-2xl" /> 400+ Match
                photos and media uploads
              </li>
            </ul>
          </div>
        </section>
        <section className="bg-cyan-100 text-gray-700 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Level Up Your Tournament?
          </h2>
          <p className="text-lg mb-6">
            Whether you're a player or organizer, KickOffMeta has something for
            you.
          </p>
          <button className="bg-white text-slate-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>
        </section>
      </div>
      <AppFooter />
    </div>
  );
}
export default About;

import React from "react";
("use client");

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { GiSoccerBall } from "react-icons/gi";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
function AppFooter() {
  return (
    <div>
      {" "}
      <Footer container className="!bg-gray-900">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="flex items-center">
              <span className="self-center !mx-0 whitespace-nowrap text-3xl  font-bold !flex !items-center dark:text-white">
                {/* <GiSoccerKick className="text-5xl text-white" /> */}
                Kick
                <GiSoccerBall />
                ff Meta
              </span>
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
              <p className="text-white font-semibold">NEWSLETTER</p>
              <input
                className="bg-white rounded p-2 w-[20rem] mt-4"
                type="email"
                name=""
                id=""
                placeholder="Your Email Address"
              />
              <button className="btn border-2 border-white rounded-xl cursor-pointer mt-5 text-white p-2">
                Subscribe Now
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle title="useful links" />
                <FooterLinkGroup col>
                  <FooterLink href="#">About</FooterLink>
                  <FooterLink href="#">Contact</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Github</FooterLink>
                  <FooterLink href="#">Instagram</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="KickOff Meta™" year={2022} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
              <FooterIcon href="#" icon={BsGithub} />
              <FooterIcon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}

export default AppFooter;

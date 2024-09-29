import TitleSection from "@/components/landing-page/title-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Banner from '../../../public/appBanner.png'

function HomePage() {
  return (
    <section>
      <div className=" text-washed-purple-500 overflow-hidden px-4 sm:p-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
        <TitleSection
          pill="🚀 Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity Platform"
        />
        <div className=" bg-white p-[2px] mt-6 rounded-xl bg-gradient-to-r from-primary to-brand-primaryBlue sm:w-[300px]  ">
          <Button variant={"secondary"} className="w-full rounded-[10px] p-6 text-2xl bg-background">Get Nota Free</Button>
        </div>
        <div className=" md:mt-[-90px] sm:w-full w-[750px] flex justify-center items-center mt-[-40px] relative sm:ml-0 ml-[-50px] ">
          <Image src={Banner} alt={"Application Banner"}/>
        </div>
      </div>
    </section>
  );
}

export default HomePage;

"use client"
import BackdropAnimation from "@/components/utils/backdrop_animation";
import {
  SpeechCard,
  TeamMemberCard,
  VisionCard,
} from "@/components/widgets/aboutScreenCards";

import DefaultLayout from "@/layouts/default";
 import { Strings1 } from "@/public/values/strings1";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import "firebase/firestore"
import "firebase/analytics";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";
export default function DocsPage() {
  

 
  return (

     
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="pb-10 max-w-7xl text-center items-center justify-center place-content-center">
        <Link href="/admin">
       <Button color="danger" variant="bordered" startContent={<IoMdExit className="transform rotate-180 size-7"/>} className='mt-8 mr-184'  href='/admin' >
        Admin Page
        </Button>
      </Link>
          <BackdropAnimation />
    
          <Image
            src="/srm_logo.png"
            width={100}
            height={50}
            alt={""}
            className="border-4 border-violet-300/50 md:hidden rounded-full mb-3"
          ></Image>

          <Breadcrumbs className="md:hidden">
            <BreadcrumbItem onClick={() => location.replace("/internalFaculty")}>
              CIIE Web App
            </BreadcrumbItem>
            <BreadcrumbItem color="primary" className="font-bold">
              About Us
            </BreadcrumbItem>
          </Breadcrumbs>

          {/* SPEECH CARDS CONTAINER */}
          <h1 className="mt-10 text-left text-xl font-bold mb-5 md:text-3xl">
            Faculty
          </h1>

          <div className="flex flex-col mx-auto gap-y-5">
            {Object.values(Strings1.professors).map((professor) => (
              <SpeechCard
                key={professor.name}
                name={professor.name}
                designation={professor.designation}
                speech={professor.speech}
                image={professor.image}
                
              />
              
            ))}
          </div>
 
          
 

          <div className="text-2xl md:text-3xl font-bold mt-20 mb-10">
            <h1 className="text-start" id="team-section">Team</h1>
          </div>
          <div className="grid gap-y-10 max-w-4xl mx-auto sm:gap-y-4 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 transition-all duration-300">
            {Object.values(Strings1.team_members).map((member) => (
              <TeamMemberCard
                key={member.name}
                image={
                  member.image == ""
                    ? member.gender == "male"
                      ? "/anonymous_male.svg"
                      : "/anonymous_female.svg"
                    : member.image
                }
                description={member.description}
                name={member.name}
                domain={member.domain}
                linkedin={member.linkedin}
                github={member.github}
              />
            ))}
          </div>
          <div className="text-2xl md:text-3xl font-bold mt-20 mb-10">
            <h1 className="text-start">Alumni</h1>
          </div>
          <div className="grid gap-y-10 max-w-4xl mx-auto sm:gap-y-4 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 transition-all duration-300">
            {Object.values(Strings1.alumni).map((member) => (
              <TeamMemberCard
                key={member.name}
                image={
                  member.image == ""
                    ? member.gender == "male"
                      ? "/anonymous_male.svg"
                      : "/anonymous_female.svg"
                    : member.image
                }
                description={member.description}
                name={member.name}
                domain={member.domain}
                linkedin={member.linkedin}
                github={member.github}
              />
            ))}
          </div>
        </div>
      </section>
    
  );
}

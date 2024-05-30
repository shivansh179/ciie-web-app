"use client"
import BackdropAnimation from "@/components/utils/backdrop_animation";
import {
  SpeechCard,
  TeamMemberCard,
  VisionCard,
} from "@/components/widgets/aboutScreenCards";

import DefaultLayout from "@/layouts/default";
import { Strings } from "@/public/values/strings";
import { Image, BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";

// const app = getApp();
// console.log(analytics.toJSON())
// const db = getFirestore(app);

// const professorsCollectionRef = collection(db, "professors");
// const missionsCollectionRef = collection(db, "missions");
// const visionCollectionRef = collection(db, "vision");
// const teamMembersCollectionRef = collection(db, "team_members");


// getDocs(professorsCollectionRef).then((querySnapshot) => {
//   querySnapshot.docs.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`);
//   });
// });



export default function DocsPage() {
  

 
  return (

    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="pb-10 max-w-7xl text-center items-center justify-center place-content-center">
          <BackdropAnimation />
    
          <Image
            src="/srm_logo.png"
            width={100}
            height={50}
            alt={""}
            className="border-4 border-violet-300/50 md:hidden rounded-full mb-3"
          ></Image>

          <Breadcrumbs className="md:hidden">
            <BreadcrumbItem onClick={() => location.replace("/")}>
              CIIE Web App
            </BreadcrumbItem>
            <BreadcrumbItem color="primary" className="font-bold">
              About Us
            </BreadcrumbItem>
          </Breadcrumbs>

          {/* SPEECH CARDS CONTAINER */}
          <h1 className="mt-10 text-left text-xl font-bold mb-5 md:text-3xl">
            Some Golden Words...
          </h1>

          <div className="flex flex-col mx-auto gap-y-5">
            {Object.values(Strings.professors).map((professor) => (
              <SpeechCard
                key={professor.name}
                name={professor.name}
                designation={professor.designation}
                speech={professor.speech}
                image={professor.image}
                
              />
              
            ))}
          </div>

          {/* VISION CONTAINER */}
          <h1 className="mt-20 text-left text-xl font-bold mb-10 sm:text-2xl md:text-3xl">
            Our Vision
          </h1>

          <VisionCard
            fixedflex={false}
            image={Strings.vision.image}
            visionText={Strings.vision.visionText}
          />

          {/* MISSION CONTAINER */}
          <h1 className="mt-20 text-left text-xl font-bold mb-10 md:text-3xl">
            Our Mission
          </h1>

          <div className="grid gap-y-10 max-w-3xl sm:gap-y-4 sm:gap-x-5 md:grid-cols-3 sm:grid-cols-2 transition-all duration-300">
            {Object.values(Strings.missions).map((mission) => (
              <VisionCard
                key={mission.text}
                image={mission.image}
                visionText={mission.text}
                fixedflex={true}
              />
            ))}
          </div>

          <div className="text-2xl md:text-3xl font-bold mt-20 mb-10">
            <h1 className="text-start" id="team-section">Meet our team</h1>
          </div>
          <div className="grid gap-y-10 max-w-4xl mx-auto sm:gap-y-4 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 transition-all duration-300">
            {Object.values(Strings.team_members).map((member) => (
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
            <h1 className="text-start">Our Alumni</h1>
          </div>
          <div className="grid gap-y-10 max-w-4xl mx-auto sm:gap-y-4 sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 transition-all duration-300">
            {Object.values(Strings.alumni).map((member) => (
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
    </DefaultLayout>
  );
}

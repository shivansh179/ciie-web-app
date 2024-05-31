import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/firebaseconfig";
import Image from "next/image";

export default function App() {
      
  const [username, setUsername] = useState('');

 
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email); // Use displayName or email as fallback
      } else {
        setUsername('');
      }
    });

    return () => unsubscribe();
  }, []);




  return (
    <Navbar className="flex flex-row justify-evenly" >
      <div className="flex flex-row items-center  gap-20">
      <NavbarBrand className="flex flex-row gap-4 items-center ">
        {/* <AcmeLogo /> */}
        <Image
          src={"/ciie_logo.png"}
          height={40}
          width={40}
          alt="ciie_logo" 
        />
        <p className="font-bold text-inherit text-3xl">CIIE</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/admin-home" aria-current="page" color="secondary">
            Reports
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Verge
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About us
          </Link>
        </NavbarItem>
      </NavbarContent>
      </div>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{username}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">  
            <Link color="foreground" href="/helpAndFeedback">
            Help & Feedback
          </Link></DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

import {
  Button,
  Link,
  Input,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { Modal } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import CIIELogo from "@/public/ciie_logo.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseconfig"; // Ensure this import is correct
import { Menu } from "@headlessui/react";

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "./";
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit mr-3">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src="/ciie_logo.png"
              alt="logo"
              width={40}
              height={30}
              className="translate-y-1 mr-2"
            />
            <p className="font-bold text-inherit text-2xl">CIIE</p>
          </NextLink>
        </NavbarBrand>

        <div className="hidden sm:flex gap-4 justify-start ml-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles(
                    siteConfig.navItems.indexOf(item) === 0
                      ? { color: "primary" }
                      : { color: "foreground" }
                  ),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="primary"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

        {user && (
          <Menu as="div" className="relative">
            <Menu.Button className="flex flex-row items-center content-center  bg-gray-300/20 rounded-xl ">
              <Image
                src={user.photoURL || "/anonymous_male.svg"}
                width={40}
                height={40}
                alt=""
                className="rounded-xl mb-3 ml-2 mr-2"
              />
              <span>{user.displayName}</span>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        )}

        {!user && (
          <Button
            color="primary"
            onClick={() => {
              setVisible(true);
              window.location.href = "./login";
            }}
          >
            Log in
          </Button>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 0
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>

      <Modal isOpen={visible} onClose={() => setVisible(false)}>
        <h1> Here we go again </h1>
      </Modal>
    </NextUINavbar>
  );
};

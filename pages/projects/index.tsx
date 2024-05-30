// pages/docs.js
import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Image,
  Button,
  Input,
  Spacer,
  Card, 
  CardHeader, 
  CardBody,
  CardFooter, 
  Divider, 
  Link,
 } from "@nextui-org/react";

 

import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";
import BackdropAnimation from "@/components/utils/backdrop_animation";
import { auth, db } from "@/firebaseconfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function DocsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initially loading
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [regNo, setRegNo] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setName(user.displayName);
        setEmail(user.email);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signinWithGoogle = (e) => {
    window.location.replace("./login");

  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    var binaryData = [];
    binaryData.push(file); 
    setFileUrl(window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"})));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !year || !regNo || !file) {
        setErrorMessage("Please fill in all fields and select a file.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("year", year);
      formData.append("regNo", regNo);
      formData.append("file", file);

      // Example of storing data in Firestore
      const docRef = doc(db, "submissions", regNo);
      await setDoc(docRef, {
        name,
        email,
        year,
        regNo,
        uploadedAt: Timestamp.now(),
      });

      // Clear form after submission
      setName("");
      setEmail("");
      setYear("");
      setRegNo("");
      setFile(null);
      setFileUrl(null);
      setErrorMessage("");

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to submit form. Please try again later.");
    }
  };

  if (!user && !loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen overflow-hidden">
          <div className="pb-52 mb-10 max-w-7xl text-center items-center justify-center place-content-center">
            <BackdropAnimation />
            {/* <Image
              src="/events.jpg"
              alt="Events"
              width={300}
              height={300}
              className="mx-auto"
            /> */}
            <Card className="max-w-[400px] mx-auto">
              <CardHeader className="flex gap-3 items-center">
                <Image
                  alt="CIIE"
                  height={40}
                  radius="sm"
                  src = "/ciie_logo.png"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-left">CIIE</p>
                  <p className="text-small text-default-500">Incubation and Innovation Cell</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>If you are a ciie member and you are not Login that's why you can't see any projects.
                  <br />
                  Please Login first.
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link href="./login">
                  Login
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="pb-10 max-w-7xl text-center items-center justify-center place-content-center">
          <BackdropAnimation />

          <Image
            src="/srm_logo.png"
            width={100}
            height={50}
            alt=""
            className="border-4 border-violet-300/50 md:hidden rounded-full mx-auto mb-3"
          />

          <Breadcrumbs className="md:hidden mr:auto">
            <BreadcrumbItem onClick={() => router.replace("/")}>
              CIIE Web App
            </BreadcrumbItem>
            <BreadcrumbItem color="primary" className="font-bold">
              Events
            </BreadcrumbItem>
          </Breadcrumbs>

          <div className="max-w-5xl w-fit mt-10 mx-auto">
            <Image
              src="/events.svg"
              alt="CIIE Web App"
              className="w-[300px] lg:w-[400px] mx-auto"
            />
          </div>

          <h1 className="mt-3 text-2xl font-bold md:text-4xl">Events</h1>

          <h1 className="text-sm mb-20 md:text-lg lg:text-xl">
            CIIE regularly hosts events and hackathons, ensuring that everyone
            has a fair chance to spotlight their skills and abilities in a
            relaxed and inclusive environment.
          </h1>


          <h1 className="text-5xl mb-5">Submit Your Report</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center justify-center w-full m-5"
          >
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <Input
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
            <Input
              label="Registration Number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              required
            />
            <Input
              label="File Upload"
              type="file"
              onChange={handleFileChange}
              required
            />
            {fileUrl && (
              <div>
                <Image src={fileUrl} alt="Uploaded File" width={100} height={100} />
              </div>
            )}
            {errorMessage && <Text color="error">{errorMessage}</Text>}
            <Button
              color="primary"
              type="submit"
              disabled={!name || !email || !year || !regNo || !file}
            >
              Submit
            </Button>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}

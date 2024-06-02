import React, { useEffect, useState } from 'react';
import { db } from '../../components/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import DefaultLayout from '@/layouts/default';
import Modal from '../../components/Model'; // Ensure the path is correct
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { IoMdExit } from 'react-icons/io';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';
import BackdropAnimation from '@/components/utils/backdrop_animation';
import { Toast } from 'react-toastify/dist/components';
 

const SuccessPage = () => {
    const [requests, setRequests] = useState([]);
    const [selectedReason, setSelectedReason] = useState(null);
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("Request Accepted");
    const [message, setMessage] = useState("Your application for joining CIIE has been accepted");
    const [verify, setVerify] = useState("");
    useEffect(() => {
      fetchData();
    }, []);
  
    const baseUrl = "https://ciie-request-backend.onrender.com";
  
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'requests'));
        const fetchedRequests: ((prevState: never[]) => never[]) | { id: string; }[] = [];
        querySnapshot.forEach((doc) => {
          fetchedRequests.push({ id: doc.id, ...doc.data() });
        });
        setRequests(fetchedRequests);
      } catch (error) {
        console.error('Error fetching data from Firebase: ', error);
      }
    };
  
    const formatDate = (timestamp: { toDate: () => any; }) => {
      if (!timestamp) return '';
      const date = timestamp.toDate();
      return date.toLocaleString();
    };
  
    const handleReasonClick = (reason: React.SetStateAction<null>) => {
      setSelectedReason(reason);
    };
  
    const closeModal = () => {
      setSelectedReason(null);
    };
  
    const handleReject = async (id: string) => {
      try {
        toast.success("Data deleted");
        await deleteDoc(doc(db, 'requests', id));
        setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    };
   
    
     
    const sendEmail = async (request: never) => {
      setEmail(request.email);
      setSubject("Request Accepted");
      setMessage("Your application for joining CIIE has been accepted");
  
      let dataSend = {
        email: request.email,
        subject: "Request Accepted",
        message: "Your application for joining CIIE has been accepted",
      };
  
      console.log(dataSend); // Log the data before sending the email

      try {
        await deleteDoc(doc(db, 'requests', request.id));
        setRequests((prevRequests) => prevRequests.filter((request) => request.id !== request.id));
      } catch (error) {
        console.error('Error accepting document: ', error);
      }
      
      toast.success("Mail sent, wait fetching current data");

      setTimeout(() => {
       
        window.location.reload();
        
      }, 5000);


      console.log("jai shri ram");
      
      
      const res = await fetch(`${baseUrl}/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        
        
      })
        
      
      if (res.ok) {
        toast.success("Message sent successfully!");
        console.log("jai shree ram");
      
      } else {
        toast.error("Failed to send message");
      }
    };

    return (
        <DefaultLayout>
          <BackdropAnimation/>
            <div className="container mx-auto">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-bold mb-6">Requests</h1>
                    <Link href="/admin">
                        <Button
                            color="danger"
                            variant="bordered"
                            startContent={<IoMdExit className="transform rotate-180 size-7" />}
                            className="mb-10"
                        >
                            Admin Page
                        </Button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-black border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Year</th>
                                <th className="py-2 px-4 border-b">Specialization</th>
                                <th className="py-2 px-4 border-b">Technical Skills</th>
                                <th className="py-2 px-4 border-b">Reason to Join CIIE</th>
                                <th className="py-2 px-4 border-b">Submitted At</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request.id}>
                                    <td className="py-2 px-4 border-b">{request.name}</td>
                                    <td className="py-2 px-4 border-b">{request.email}</td>
                                    <td className="py-2 px-4 border-b">{request.year}</td>
                                    <td className="py-2 px-4 border-b">{request.specialization}</td>
                                    <td className="py-2 px-4 border-b">{request.technicalSkills}</td>
                                    <td className="py-2 px-4 border-b">
                                        <span
                                            className="text-blue-500 hover:underline cursor-pointer"
                                            onClick={() => handleReasonClick(request.reasonToJoin)}
                                        >
                                            {request.reasonToJoin ? request.reasonToJoin.slice(0, 10) + '...' : 'N/A'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">{formatDate(request.submittedAt)}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            className="text-green-500 hover:underline mr-2"
                                            onClick={() => sendEmail(request)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => handleReject(request.id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedReason && (
                    <Modal onClose={closeModal}>
                        <h2 className="text-xl font-bold mb-4">Reason to Join CIIE</h2>
                        <p>{selectedReason}</p>
                    </Modal>
                )}
                <Toaster position='bottom-center'/>
            </div>
        </DefaultLayout>
    );
};

export default SuccessPage;

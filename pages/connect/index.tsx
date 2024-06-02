import { useState } from 'react';
import { db } from '../../components/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';

const ConnectPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: '',
    specialization: '',
    technicalSkills: '',
    reasonToJoin: ''
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // Save form data to Firestore
      const requestsCollection = collection(db, 'requests');
      await addDoc(requestsCollection, {
        ...formData,
        submittedAt: new Date()
      });
      toast.success('Your request has been submitted successfully!');
      setFormData({
        name: '',
        email: '',
        year: '',
        specialization: '',
        technicalSkills: '',
        reasonToJoin: ''
      });
    } catch (error) {
      console.error("Error saving form data:", error);
      toast.error("Error occurred while submitting the form.");
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Connect with CIIE</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input title='name' type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" required />
        </div>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input title='email' type="email" name="email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" required />
        </div>
        {/* Year Field */}
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700 font-bold mb-2">Year</label>
          <input title='year' type="text" name="year" value={formData.year} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        {/* Specialization Field */}
        <div className="mb-4">
          <label htmlFor="specialization" className="block text-gray-700 font-bold mb-2">Specialization</label>
          <input title="specialization" type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        {/* Technical Skills Field */}
        <div className="mb-4">
          <label htmlFor="technicalSkills" className="block text-gray-700 font-bold mb-2">Technical Skills</label>
          <input title='skills' type="text" name="technicalSkills" value={formData.technicalSkills} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
        {/* Reason to Join Field */}
        <div className="mb-4">
          <label htmlFor="reasonToJoin" className="block text-gray-700 font-bold mb-2">Reason to Join</label>
          <textarea title='reason' name="reasonToJoin" value={formData.reasonToJoin} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full"></textarea>
        </div>
        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">Submit</button>
      </form>
      <Toaster position='bottom-center'/>
    </div>
  );
};

export default ConnectPage;
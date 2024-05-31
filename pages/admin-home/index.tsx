// pages/dataTable.js
import { useEffect, useState } from 'react';
import { db } from '@/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import withAdminAuth from '@/components/withAdminAuth';
import Modal from '@/components/Model';

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'submissions'));
        const dataList = querySnapshot.docs.map(doc => doc.data());
        setData(dataList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-300">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Registration Number</th>
              <th className="py-2 px-4 border-b">Uploaded At</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">File</th>
              <th className="py-2 px-4 border-b">Project Des</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{item.email}</td>
                <td className="py-2 px-4 pl-16 border-b">{item.name}</td>
                <td className="py-2 px-4 pl-16 border-b">{item.regNo}</td>
                <td className="py-2 px-4 pl-16 border-b">{new Date(item.uploadedAt.seconds * 1000).toLocaleString()}</td>
                <td className="py-2 px-4 pl-12 border-b">{item.year}</td>
                <td className="py-2 px-4 border-b">
                  {item.fileUrl ? (
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View File
                    </a>
                  ) : (
                    'No file uploaded'
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {item.project ? (
                    <span
                      className="text-blue-500 hover:underline cursor-pointer"
                      onClick={() => handleProjectClick(item.project)}
                    >
                      {item.project.split(' ')[0]+"..."}
                    </span>
                  ) : (
                    'No description'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProject && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Project Description</h2>
          <p>{selectedProject}</p>
        </Modal>
      )}
    </div>
  );
};

export default withAdminAuth(AdminPage);

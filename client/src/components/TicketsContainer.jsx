import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Background from './Background';

const TicketsContainer = () => {
  const { tickets, setTickets, user } = useOutletContext();

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleView = (ticketId) => {
    navigate(`/tickets/${ticketId}`); // Navigate to the single ticket page
  };

  

  const handleDelete = async (ticketId) => {
    try {
      // Make a DELETE request to your API
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Remove the deleted ticket from the state
        setTickets((prevTickets) => prevTickets.filter(ticket => ticket.id !== ticketId));
        console.log(`Deleted ticket with ID: ${ticketId}`);
      } else {
        console.error('Error deleting ticket');
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className="p-4">
      <Background/>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.summary}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.priority}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.creator.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 cursor-pointer" onClick={() => handleView(ticket.id)}>View</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${ticket.creator.id === user.id ? 'text-red-500 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`} 
                  onClick={() => ticket.creator.id === user.id && handleDelete(ticket.id)}>
                {ticket.creator.id === user.id ? 'Delete' : 'Not Allowed'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsContainer;

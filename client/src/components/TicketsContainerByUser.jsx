
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Background from './Background';

const TicketsContainerByUser = () => {
  const { user,tickets } = useOutletContext();
  const ticketsByUser = tickets.filter(ticket=>{console.log(ticket.creator.id); return  ticket.creator.id == user.id})
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          
          {ticketsByUser.map(ticket => (
            <tr key={ticket.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.summary}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.priority}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.creator.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketsContainerByUser;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import Background from './Background';

const SingleTicketPage = () => {
  const { ticketId } = useParams();
  const { user } = useOutletContext();
  const [ticket, setTicket] = useState(null);
  const [newAssignee, setNewAssignee] = useState('');
  const [newComment, setNewComment] = useState('');
  const [status, setStatus] = useState('');
  const [assigneeRole, setAssigneeRole] = useState('tester')
  const statusOptions = ['open', 'in-progress', 'closed'];

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/tickets/${ticketId}`);
        const ticketData = await response.json();
        setTicket(ticketData);
        setStatus(ticketData.status); // Set initial status
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };
    fetchTicket();
  }, [ticketId]);

  const handleAddAssignee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tickets/${ticketId}/assignees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: assigneeRole, user_id: parseInt(newAssignee) }),
      });
      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
        setNewAssignee('');
      } else {
        console.error('Error adding assignee');
      }
    } catch (error) {
      console.error('Error adding assignee:', error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary: newComment, user_id: user.id, ticket_id: ticketId }),
      });
      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
        console.log(updatedTicket)
        setNewComment('');
      } else {
        console.error('Error adding comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        const updatedTicket = await response.json();
        setTicket(updatedTicket);
        setStatus(newStatus); // Update the local status
      } else {
        console.error('Error updating status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <Background />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{ticket.title}</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Summary:</h2>
          <p className="text-gray-600">{ticket.summary}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Status:</h2>
          <select
            value={status}
            onChange={handleStatusChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Priority:</h2>
          <p className="text-gray-600">{ticket.priority}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Created By:</h2>
          <p className="text-gray-600">{ticket.creator.name}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Assignees:</h2>
          <ul className="list-disc list-inside pl-5">
            {/* {console.log(ticket)} */}
            {ticket.ticket_assignees.map(assignee => (
              <li key={assignee.id} className="text-gray-600">assignee{assignee.user}</li>
            ))}
          </ul>
        </div>
        {ticket.creator.id === user.id && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add Assignee:</h2>
            <form onSubmit={handleAddAssignee}>
              <input
                type="text"
                value={assigneeRole}
                onChange={(e) => setAssigneeRole(e.target.value)}
                placeholder="role"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="text"
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                placeholder="User ID of new assignee"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <button type="submit"
                // onClick={handleAddAssignee}
                className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
              >
                Add Assignee
              </button>
            </form>
          </div>
        )}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Comments:</h2>
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="4"
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
            >
              Add Comment
            </button>
          </div>
          <ul className="list-disc list-inside pl-5">
            {ticket.comments.map(comment => (
              <li key={comment.id} className="mb-2">
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-gray-800">{comment.author.name}:</span>
                  <span className="ml-2 text-gray-600">{comment.summary}</span>
                </div>
                <span className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleTicketPage;

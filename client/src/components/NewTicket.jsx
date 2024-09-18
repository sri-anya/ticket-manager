
import React, { useState } from 'react';
import Divider from './Divider';
import { useOutletContext } from "react-router-dom";

const NewTicket = () => {
    const { tickets, setTickets } = useOutletContext();
    const { user } = useOutletContext();
    
    const [newTicketData, setNewTicketData] = useState({
        title: "",
        summary: "",
        status: "open", // Default value
        priority: "low", // Default value
        created_by: user.id
    });
    const [isFormVisible, setIsFormVisible] = useState(true); // State to manage form visibility

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("/api/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(newTicketData),
        })
        .then((r) => r.json())
        .then((newTicket) => {
            setTickets([...tickets, newTicket]);
            setNewTicketData({ 
                title: "",
                summary: "",
                status: "open", // Reset to default value
                priority: "low", // Reset to default value
                created_by: user.id,
            });
            setIsFormVisible(false); 
        });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewTicketData({ ...newTicketData, [name]: value });
    };

    return (
        <div>
            {isFormVisible ? (
                <form className="text-center mx-44 space-y-4 p-6 bg-white shadow-md rounded-lg" id="newTicketForm" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ticket Information</h2>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700" htmlFor="title">Title:</label>
                        <input 
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            type="text" 
                            name="title" 
                            id="title" 
                            onChange={handleChange} 
                            value={newTicketData.title} 
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700" htmlFor="summary">Summary:</label>
                        <input 
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            type="text" 
                            name="summary" 
                            id="summary" 
                            onChange={handleChange} 
                            value={newTicketData.summary} 
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700" htmlFor="status">Status:</label>
                        <select
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="status"
                            id="status"
                            onChange={handleChange}
                            value={newTicketData.status}
                        >
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-700" htmlFor="priority">Priority:</label>
                        <select
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="priority"
                            id="priority"
                            onChange={handleChange}
                            value={newTicketData.priority}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center mx-44 p-6 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Ticket submitted successfully!</h2>
                </div>
            )}

            <Divider />
        </div>
    );
};

export default NewTicket;

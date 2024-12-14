import React, { useState, useEffect } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import Modal from './components/Modal';
import './style.css';
import axios from 'axios';


function Home() {
    const currentLocation = useLocation(); // Get the current location
    const name = currentLocation.state ? currentLocation.state.name : "Guest"; 
    const user_id = currentLocation.state ? currentLocation.state.user_id : 0;
    const navigate = useNavigate(); 
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [values, setValues] = useState({
        note_title: '',
        note_content: ''
    });
    const [notes, setNotes] = useState([]); // State to store notes
    const [editingNoteId, setEditingNoteId] = useState(null); // State to track which note is being edited

    // Fetch notes when the component mounts
    useEffect(() => {
        fetchNotes();
    }, []); // Empty dependency array means this runs once when the component mounts

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`https://keep-notes-jade.vercel.app/notesget/${user_id}`);
            setNotes(response.data); // Set the fetched notes to state
        } catch (err) {
            console.error("Error fetching notes:", err);
            alert("An error occurred while fetching notes. Please try again.");
        }
    };

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); // Store as string
    };

    const handleSave = async () => {
        if (editingNoteId) {
            // Update existing note
            await handleUpdate(editingNoteId, values.note_title, values.note_content);
        } else {
            // Create new note
            await handleSubmit(values.note_title, values.note_content);
        }
    };

    const handleSubmit = async (title, content) => {
        if (title !== "" && content !== "") {
            try {
                const response = await axios.post('https://keep-notes-jade.vercel.app/notespost', {
                    note_title: title,
                    note_content: content,
                    user_id:user_id
                });

                console.log(response);
                if (response.data) {
                    closeModal();
                    fetchNotes(); // Fetch notes again to update the list
                }
            } catch (err) {
                console.error("Error during saving note:", err);
                alert("An error occurred during saving the note. Please try again.");
            }
        }
    };
    const handleLogout = () => {
        // Clear user data (if stored in local storage or state)
        // For example, if you stored user data in local storage:
        localStorage.removeItem('user'); // Adjust based on how you store user data

        // Redirect to login page
        navigate('/'); // Adjust the path based on your routing
    };

    const handleUpdate = async (id, title, content) => {
        if (title !== "" && content !== "") {
            try {
                const response = await axios.put(`https://keep-notes-jade.vercel.app/notes/${id}`, {
                    note_title: title,
                    note_content: content,
                    user_id:user_id
                });

                console.log(response);
                if (response.data) {
                    closeModal();
                    fetchNotes(); // Fetch notes again to update the list
                }
            } catch (err) {
                console.error("Error during updating note:", err);
                alert("An error occurred during updating the note. Please try again.");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://keep-notes-jade.vercel.app/notes/${id}`, {
                data: { user_id: user_id } // Send user_id in the data property
            });
            fetchNotes(); // Fetch notes again to update the list
        } catch (err) {
            console.error("Error during deleting note:", err);
            alert("An error occurred during deleting the note. Please try again.");
        }
    };

    const openModal = (note = null) => {
        if (note) {
            setValues({
                note_title: note.note_title,
                note_content: note.note_content
            });
            setEditingNoteId(note.note_id); // Set the ID of the note being edited
        } else {
            setValues({
                note_title: '',
                note_content: ''
            });
            setEditingNoteId(null); // Reset for new note
        }
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => setIsModalOpen(false); // Close the modal

    return (
        <div>
            <div className='fixed top-0 d-flex backroundblue justify-content-between px-5 align-items-center p-3 font-weight-bold custom-font'>
                <div className="p-2">Keep Notes</div>
                <div className="d-flex p-2">
                    <div className='px-1'>www</div>
                    <div className='px-1'>www</div>
                    <div className='px-1'>www</div>
                    <div className='px-1' onClick={handleLogout}>www</div>
                </div>
            </div>

            <div>
                <div className='bgpink vh-100 overflow-hidden justify-content-center align-items-center'>
                    <div className='container'>
                        <h2>Good Morning {name}!</h2>
                        <div>{user_id}</div>
                        <div>
                            {notes.length === 0 ? (
                                <p>No notes available.</p>
                            ) : (
                                <div className='row'>
                                    {notes.map(note => (
                                        <div key={note.note_id} className='col-md-4 mb-4'>
                                            <div className='card' onClick={() => openModal(note)}>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{note.note_title}</h5>
                                                    <p className='card-text'>{note.note_content}</p>
                                                    <p className='card-text'>
                                                        <small className='text-muted'>
                                                            Created on: {new Date(note.created_on).toLocaleString()}
                                                        </small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end mx-6'>
                        <button onClick={() => openModal()} className='mx-5'>Add Note</button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                isEdit={!!editingNoteId} // Set isEdit to true if editing a note
                onClose={closeModal}
                values={values}
                handleInput={handleInput}
                handleSave={handleSave} // Pass the handleSave function
                handleDelete={() => {
                    handleDelete(editingNoteId);
                    closeModal();
                }} // Pass the delete function to the modal
            /> {/* Render the modal */}
        </div>
    );
};

export default Home;
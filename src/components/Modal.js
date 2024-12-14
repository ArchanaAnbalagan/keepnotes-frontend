import React from 'react';
import './Modal.css'; // Ensure this path is correct

const Modal = ({ isOpen,isEdit,onClose, values, handleInput, handleSave, handleDelete }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open
    
    return (
        <div className="modal-overlay">
            <div className="modal-content rounded" style={{ backgroundColor: 'white', width: '500px' }}>
                <div className='bgpink border-b bcolor rounded-t d-flex justify-content-between px-5'>
                    <div>{isEdit ? 'Edit Note' : 'Add Note'}</div>
                    <div><button onClick={onClose} className=''>Close</button></div>
                </div>
                <div className='backroundblue px-3'>
                    <input
                        type="text"
                        placeholder='Title'
                        className='w-100 my-2 py-2 rounded bcolor'
                        onChange={handleInput}
                        name='note_title'
                        value={values.note_title} // Bind the value
                    />
                    <textarea
                        onChange={handleInput}
                        placeholder='Content'
                        className='w-100 my-2 py-2 rounded bcolor'
                        name='note_content'
                        rows='4' // You can adjust the number of rows as needed
                        value={values.note_content} // Bind the value
                    ></textarea>
                    <div className='d-flex justify-content-end'>
                    {isEdit ?  <button onClick={handleSave} className=''>Edit</button> : <button onClick={handleSave} className=''>Save</button> }
                       {/* Call handleSave on click */}
                        {isEdit ? <button onClick={handleDelete} className=''>Delete</button>: <button onClick={onClose} className=''>Cancel</button>} {/* Call handleDelete if editing */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
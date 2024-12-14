import React from 'react';
import './Modal.css'; // Ensure this path is correct

const Modal = ({ isOpen,isEdit,onClose, values, handleInput, handleSave, handleDelete }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open
    
    return (
        <div className="modal-overlay" >
            <div className="modal-content " style={{ width: '500px' ,borderRadius:"14px"}}>
                <div className='bgpink border-b bcolor  d-flex justify-content-between px-2' style={{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
                   
                    <div style={{ color: "#8B4513",fontWeight:600 }} className='p-2 '>{isEdit ? 'Edit Note' : 'Add Note'}</div>
                    <div onClick={onClose} className='mt-2'>
                    ✖</div>
                </div>
                <div className='backroundblue px-3 ' style={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}>
                    <input
                        type="text"
                        placeholder='Title'
                        className=' rounded bcolor  my-3 p-2'
                                    style={{fontSize:"14px",width:"100%"}}
                        onChange={handleInput}
                        name='note_title'
                        value={values.note_title} // Bind the value
                    />
                    <textarea
                        onChange={handleInput}
                        placeholder='Content'
                        className=' rounded bcolor  my-3 p-2'
                        style={{fontSize:"14px",width:"100%"}}
                        name='note_content'
                        rows='6' // You can adjust the number of rows as needed
                        value={values.note_content} // Bind the value
                    ></textarea>
                    <div className='d-flex justify-content-end'>
                    {isEdit ?  <button onClick={handleSave} type='submit' className='btn px-5   m-3 ' style={{ backgroundColor: "#32a852", color: "white", fontSize: "14px",fontWeight:"bold" }}>Edit</button> : <button onClick={handleSave} type='submit' className='btn m-3 px-5' style={{ backgroundColor: "#32a852", color: "white", fontSize: "14px",fontWeight:"bold" }}>Add</button> }
                       {/* Call handleSave on click */}
                        {isEdit ? <button onClick={handleDelete} className='btn px-5 m-3 '  style={{ backgroundColor: "#cf4530", color: "white", fontSize: "14px",fontWeight:"bold" }}>Delete</button>: <button onClick={onClose} className='btn  m-3 px-5 ' style={{ backgroundColor: "#cf4530", color: "white", fontSize: "14px",fontWeight:"bold" }}>Cancel</button>} {/* Call handleDelete if editing */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
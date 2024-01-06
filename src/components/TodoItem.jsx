import React from 'react';
import '../style.css'

function TodoItem({ task, index, handleTaskCheckbox, handleEdit, handleSave, handleDelete, handleEditKeyPress, editingIndex }) {
    return (
        <div className={task.done ? 'todo-item done' : 'todo-item'}>
            <div className='left-side-todo-item'>
                <input
                    className="checkbox-input"
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleTaskCheckbox(index)}
                />
                {editingIndex === index ? (
                    <input
                        type="text"
                        className="edit-input"
                        value={task.text}
                        onChange={(e) => {
                            const newText = e.target.value;
                            handleSave(index, newText);
                        }}
                        onBlur={() => handleSave(index, task.text)}
                        onKeyPress={(e) => handleEditKeyPress(e, index)}
                        autoFocus
                    />
                ) : (
                    <span
                        className="task-text"
                        style={{
                            textDecoration: task.done ? 'line-through' : 'none',
                            color: task.done ? '#A9A9A9' : 'inherit',
                        }}
                        onClick={() => handleEdit(index)}
                    >
                        {task.text}
                    </span>
                )}
            </div>
            <div className="dropdown">
                {editingIndex === index ? (
                    <button className="save-button" onClick={() => handleSave(index, task.text)}>
                        Save
                    </button>
                ) : (
                    <button className="dropbtn" onClick={() => handleEdit(index)}>
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                )}
                <div className="dropdown-content">
                    <span className='edit-button' onClick={() => handleEdit(index)}>Edit</span>
                    <span className='delete-button' onClick={() => handleDelete(index)}>Delete</span>
                </div>
            </div>
        </div>
    );
}

export default TodoItem;

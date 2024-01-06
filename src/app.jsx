import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import FilterDropdown from './components/FilterDropDown';


function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [filter, setFilter] = useState('all');
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('https://todos-json-server.herokuapp.com/todos')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    useEffect(() => {
        fetch('https://todos-json-server.herokuapp.com/todos')
            .then((response) => response.json())
            .then((data) => {
                setTodos(data.todos);
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
            });
    }, []);

    useEffect(() => {
        fetch('https://todos-json-server.herokuapp.com/todos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error('There was a problem fetching data:', error);
            });
    }, []);

    // Function to update a task
    const updateTask = (id, updatedTask) => {
        fetch(`https://todos-json-server.herokuapp.com/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Handle the updated data
                console.log('Task updated:', data);
            })
            .catch((error) => {
                console.error('There was a problem updating the task:', error);
            });
    };

    // Function to delete a task
    const deleteTask = (id) => {
        fetch(`https://todos-json-server.herokuapp.com/todos/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // If successful deletion, update the tasks list
                setTasks(tasks.filter((task) => task.id !== id));
            })
            .catch((error) => {
                console.error('There was a problem deleting the task:', error);
            });
    };

    useEffect(() => {
        const completed = tasks.filter((task) => task.done).length;
        const totalTasks = tasks.length !== 0 ? tasks.length : 1;
        const progress = Math.floor((completed / totalTasks) * 100);
        document.documentElement.style.setProperty('--progress-width', `${progress}%`);
    }, [tasks]);


    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && taskInput.trim() !== '') {
            setTasks([...tasks, { text: taskInput, done: false }]);
            setTaskInput('');
        }
    };

    const handleTaskCheckbox = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = !updatedTasks[index].done;
        setTasks(updatedTasks);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    const handleSave = (index, newText) => {
        const updatedTasks = [...tasks];
        if (newText.trim() !== '') {
            updatedTasks[index].text = newText;
            setTasks(updatedTasks);
        }
        setEditingIndex(null);
    };

    const handleDelete = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const handleEditKeyPress = (event, index) => {
        if (event.key === 'Enter') {
            handleSave(index, event.target.value);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'done') {
            return task.done;
        } else if (filter === 'undone') {
            return !task.done;
        }
        return true; // 'all' filter option
    });



    return (
        <div className="todo-container">
            <div className="progress-box">
                <h1>Progress</h1>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: 'var(--progress-width)' }}></div>
                </div>
                <div className="progress-count">
                    {tasks.filter((task) => task.done).length} completed
                </div>
            </div>
            <FilterDropdown filter={filter} setFilter={setFilter} />
            <div className="todo-list">
                {filteredTasks.map((task, index) => (
                    <TodoItem
                        key={index}
                        task={task}
                        index={index}
                        handleTaskCheckbox={handleTaskCheckbox}
                        handleEdit={handleEdit}
                        handleSave={handleSave}
                        handleDelete={handleDelete}
                        handleEditKeyPress={handleEditKeyPress}
                        editingIndex={editingIndex}
                    />
                ))}
                <input
                    type="text"
                    placeholder="Add your todo..."
                    className="add-todo"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}

export default TodoApp;

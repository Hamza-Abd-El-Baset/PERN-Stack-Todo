import { useState } from "react";

const EditTodo = ({ todo }) => {
    
    const [description, setDescription] = useState(todo.description)

    const updateDescription = async(e) => {
        e.preventDefault()
        try {
            await fetch(`http://localhost:5000/todos/${todo.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({description})
            })
            window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }

    return (  
        <>
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${todo.id}`}
            >
                Edit
            </button>

            <div className="modal" id={`id${todo.id}`} onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" className="close" data-dismiss="modal">
                            &times;
                        </button>
                    </div>

                    <div className="modal-body">
                        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={(e) => updateDescription(e)}>
                        Edit
                    </button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">
                        Close
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </>
        );
};

export default EditTodo;

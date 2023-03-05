import './modal.css'

function Modal (){
    return (
    <div className="main-modal"> 

        <div className="modal">
            <h1>Deleting the Post!</h1>
            <h3>Are You Sure?</h3>
            <div className="buttons">

                <button className="btnModal">Delete</button>
                <button className="btnModal">Cancel</button>
            </div>
        </div>
    </div>
    )
}

export default Modal
import React, {useEffect} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function FrameModal(props) {
  const {visible, handleClose, frameElement} = props

  useEffect(() => {
    if(visible) {
      // document.body.appendChild(frameElement);
      let divElement = document.createElement("DIV"); 
      divElement.appendChild(frameElement);
      document.getElementById("oracleFrammeDiv").appendChild(divElement);
    }
    
  }, [visible])
  
  return (
      <Modal
        show={visible}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Body>
          <div>
            <IoIosCloseCircleOutline size={32} className='primaryColor' onClick={handleClose} style={{position: 'absolute', top: 0, right: 0, cursor: 'pointer'}} />
            <div id="oracleFrammeDiv" className='iFrameDiv' style={{width:'100%', height: '75vh'}}></div>
          </div>
        </Modal.Body>
         
      </Modal>
  );
}

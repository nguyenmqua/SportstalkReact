import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../utils/UserContext';
import { Button, Modal} from 'semantic-ui-react'
import API from '../../utils/API';
import {Form, Input} from 'reactstrap'

const Edit  = () => {
    const [Open, setOpen] = useState(false)
    const {setImageSelected,uploadImage} =useContext(UserContext)
   
  
    return(
        <>
        <Modal
        open={Open}
        size= "tiny"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>Edit Profile Pic</Button>}
        >
        <Modal.Header>Select Profile Pic</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
            <Form>
                <Input
                    type="file"
                    name="file"
                    placeholder="profile image"
                    onChange={(event) => {
                    setImageSelected(event.target.files[0]);
                    }}
                />
            </Form>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button positive onClick={uploadImage}>
            Submit
          </Button>
        </Modal.Actions>
        
      </Modal>
    </>
    )
};

export default Edit
import React, { useState, useContext } from 'react';
import UserContext from '../../utils/UserContext';
import { Button, Modal} from 'semantic-ui-react'
import API from '../../utils/API';
import {Form, Input} from 'reactstrap'

const Edit  = () => {
    const [Open, setOpen] = useState(false)
    const {user} =useContext(UserContext)
    const [imageSelected, setImageSelected] = useState({})
    const [loading, setLoading] = useState(false)


    const uploadImage = async (e) => {
        const data = new FormData()
        data.append('file', imageSelected)
        data.append('upload_preset', 'janishto')
        setLoading(true)
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/sportstalk/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()

      API.getUpdateProfilePic({
          userId: user._id,
          profilePic: file.secure_url
        })
        window.location.href = '/';
            
        }

    ;
    return(
        <>
        <Modal
        open={Open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button id="headers" color="blue" style={{fontSize: "24px", color:"#000000"}}>Edit Profile Pic</Button>}
        >
        <Modal.Header id="headers" style={{fontSize:"50px"}}>Select Profile Pic</Modal.Header>
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
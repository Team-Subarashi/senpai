import React, { useEffect, useState } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import '@opentok/client';
import axios from 'axios';
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import IconButton from '@material-ui/core/IconButton'

export default function Video({lesson}) {
  const apiKey = process.env.REACT_APP_VONAGE_API_KEY // TEMP?
  const [token, setToken] = useState(null)
  const [cameraState, setCameraState] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/v1/vonage/token/${lesson.vonageSessionId}`)
      if (response.data) {
        setToken(response.data)
      }
    }

    if (lesson.vonageSessionId) {
      fetchData()
    }

  }, [lesson])

  const toggleVideo = () => {
    setCameraState(!cameraState)
  }

  return (
    <div>
      {token ? 
        <OTSession apiKey={apiKey} sessionId={lesson.vonageSessionId} token={token}>
          <OTPublisher properties={{ publishVideo: cameraState }} />
          <IconButton onClick={toggleVideo} style={{backgroundColor: "whitesmoke"}}>
            <LinkedCameraIcon style={cameraState ? {color: "red"} : {color: "grey"}} />
          </IconButton>
          <OTStreams>
            <OTSubscriber />
          </OTStreams>
        </OTSession> : null
      }
    </div>
  )
}

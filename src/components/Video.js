import React, { useEffect, useState } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import '@opentok/client';
import axios from 'axios';

export default function Video({lesson}) {
  const apiKey = process.env.REACT_APP_VONAGE_API_KEY // TEMP?
  const [token, setToken] = useState(null)

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

  return (
    <div>
      {token ? 
        <OTSession apiKey={apiKey} sessionId={lesson.vonageSessionId} token={token}>
          <OTPublisher />
          <OTStreams>
            <OTSubscriber />
          </OTStreams>
        </OTSession> : null
      }
    </div>
  )
}

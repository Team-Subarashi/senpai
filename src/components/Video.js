import React, { useEffect } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import '@opentok/client';

export default function Video() {
  // TEMP UNTIL SERVER IS SET UP
  const apiKey = process.env.REACT_APP_VONAGE_API_KEY
  const sessionId = process.env.REACT_APP_VONAGE_SESSION_ID
  const token = process.env.REACT_APP_VONAGE_TOKEN

  useEffect(() => {

    return () => {
    }
  }, [])


  return (
    <OTSession apiKey={apiKey} sessionId={sessionId} token={token}>
      <OTPublisher />
      <OTStreams>
        <OTSubscriber />
      </OTStreams>
    </OTSession>
  )
}

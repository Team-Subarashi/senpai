import React, { useEffect, useState, useRef } from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";
import "@opentok/client";
import axios from "axios";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  streamButton: {
    backgroundColor: "whitesmoke",
    color: "grey",
    borderRadius: "10%",
    marginLeft: "1rem",
  },
  streamsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "space-evenly",
    height: "87vh",
    minWidth: "264px",
  },
  publisherContainer: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
}));

export default function Video({ lesson }) {
  const apiKey = process.env.REACT_APP_VONAGE_API_KEY; // TEMP?
  const [token, setToken] = useState(null);
  const [cameraState, setCameraState] = useState(true);
  const [micState, setMicState] = useState(true);
  const publisher = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/v1/vonage/token/${lesson.vonageSessionId}`
      );
      if (response.data) {
        setToken(response.data);
      }
    };

    if (lesson.vonageSessionId) {
      fetchData();
    }
  }, [lesson]);

  const toggleVideo = () => {
    setCameraState(!cameraState);
  };
  const toggleMic = () => {
    setMicState(!micState);
  };

  return (
    <div>
      {token ? (
        <OTSession
          apiKey={apiKey}
          sessionId={lesson.vonageSessionId}
          token={token}
        >
          <div className={classes.streamsContainer}>
            <div>
              <OTPublisher
                ref={publisher}
                properties={{
                  publishVideo: cameraState,
                  publishAudio: micState,
                  showControls: true,
                  style: { buttonDisplayMode: "off" },
                }}
              />
              <div className={classes.publisherContainer}>
                <IconButton
                  onClick={toggleVideo}
                  className={classes.streamButton}
                >
                  {cameraState ? <Videocam /> : <VideocamOff />}
                </IconButton>
                <IconButton
                  onClick={toggleMic}
                  className={classes.streamButton}
                >
                  {micState ? <Mic /> : <MicOff />}
                </IconButton>
              </div>
            </div>
            <OTStreams>
              <OTSubscriber />
            </OTStreams>
          </div>
        </OTSession>
      ) : null}
    </div>
  );
}

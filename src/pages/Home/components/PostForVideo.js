import React, { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import KesfetVideoBig from '../../../assets/video/instagram-kesfet-video-big.mp4'
import KesfetVideoSmall from '../../../assets/video/instagram-kesfet-video-small.mp4'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostImg = styled.img`
    width: 100%;
    height: 100%;
`

export default function PostForVideo({ open, setOpen, post }) {
  const navigate = useNavigate();
  const videoRef = useRef();
  const [videoPlayState, setVideoPlayState] = useState(false);

  const handleClose = () => {
    navigate("");
    setOpen(false);
  };

  const changeVideoPlayState = () => {
    if(videoPlayState) {
        videoRef.current.pause();
    } else {
        videoRef.current.play();
    }
    setVideoPlayState(!videoPlayState);
  }

  return (
    <>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            sx: {
              height: 898,
              width: 1004
            },
          }}
          maxWidth="lg"
          fullWidth={true}
        >
          <DialogContent
            style={{
              padding: 0,
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                width: 504,
                height: "100%",
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor: "black",
              }}
              onClick={() => changeVideoPlayState()}
            >
              <video
                style={{
                  objectFit: "contain",
                  overflowClipMargin: "content-box",
                  overflow: "clip",
                  width: "100%",
                }}
                autoPlay="autoplay"
                muted
                loop={true}
                ref={videoRef}
              >
                <source src={KesfetVideoBig} />
              </video>
            </div>

            <div
              style={{
                width: 500,
                height: "100%",
              }}
            ></div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
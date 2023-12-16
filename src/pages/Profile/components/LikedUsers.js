import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import styled2 from 'styled-components';

export const Follower = styled2.div`
    padding: 8px 16px;
    display: flex;
    align-items: center;
`
export const FollowerPicture = styled2.img`
    border-radius: 50%;
    width: 44px;
    height: 44px;
`
export const FollowerInfos = styled2.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    
    > div {
        display: flex;
        align-items: center;
    }
`
export const FollowerUsername = styled2.div`
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
`
export const FollowerName = styled2.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
`

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function LikedUsers({ open, setOpen, likedUsers }) {

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{ sx: { borderRadius: "12px", minWidth: 400, width: 400 } }}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 16,
                        fontWeight: 600,
                    }}
                    id="customized-dialog-title"
                >
                    Beğenmeler
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent
                    dividers
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0px !important",
                    }}
                >
                    <div style={{ overflowY: "auto", height: 309 }}>
                        {
                            likedUsers.map((user, index) => (
                                <Follower key={index}>
                                    <Link to={`/${user.username}`}>
                                        <FollowerPicture src={user.picture} />
                                    </Link>
                                    <FollowerInfos>
                                        <div>
                                            <Link to="/">
                                                <FollowerUsername>{user.username}</FollowerUsername>
                                            </Link>
                                        </div>
                                        <FollowerName>{user.name}</FollowerName>
                                    </FollowerInfos>
                                </Follower>
                            ))
                        }
                    </div>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}
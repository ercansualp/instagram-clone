import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {CloseIcon} from "../../../assets/img/svg";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function MessageFile({messageFile, open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogContent
                    dividers
                    style={{
                        padding: 0,
                        border:"none"
                    }}
                >
                    {
                        messageFile.message_type === "video/mp4" ? (
                            <video autoPlay={true} controls>
                                <source
                                    src={messageFile.message_content}
                                    type="video/mp4"/>
                            </video>
                        ) : (
                            <img src={messageFile.message_content} alt="" />
                        )
                    }
                </DialogContent>
                <button style={{position: "fixed", top: 10, right: 10, width: 34, height: 34, padding: 8}} onClick={handleClose}>
                    <CloseIcon/>
                </button>
            </BootstrapDialog>
        </>
    );
}
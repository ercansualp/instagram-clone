import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function BackToShare({open, setOpen, setImg}) {
    const handleClose = () => {
        setOpen(false);
    };

    const clearImg = () => {
        setImg(null);
        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            PaperProps={{
                style: {
                    borderRadius: 12,
                    width: 400
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <span style={{fontWeight: 400, fontSize: 20}}>Gönderiyi sil?</span>
                    <span style={{fontWeight: 400, fontSize: 14}}>Çıkarsan düzenlemelerin kaydedilmeyecek.</span>
                </div>
            </DialogTitle>
            <DialogContent sx={{fontSize: 14, padding: 0}}>
                <button
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 47,
                        width: "100%",
                        color: "red",
                        fontWeight: 700,
                        borderWidth: "1px 0 0",
                        borderStyle: "solid",
                        borderColor: "rgb(219, 219, 219)"
                    }}
                    onClick={clearImg}
                >
                    Sil
                </button>
                <button
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 47,
                        width: "100%",
                        fontWeight: 400,
                        borderWidth: "1px 0 0",
                        borderStyle: "solid",
                        borderColor: "rgb(219, 219, 219)"
                    }}
                    onClick={handleClose}
                >
                    İptal
                </button>
            </DialogContent>
        </Dialog>
    );
}
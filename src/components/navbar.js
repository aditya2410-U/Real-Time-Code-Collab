import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SensorsIcon from '@mui/icons-material/Sensors';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({codeRef , recentEditors}) => {
  const { roomId } = useParams();  
  const reactNavigator = useNavigate();

  async function copyRoomId() {
    if (!roomId) {
        toast.error("Room ID not found");
        return;
    }
    try {
        await navigator.clipboard.writeText(roomId);
        toast.success("Room ID copied to clipboard");
    } catch (err) {
        toast.error("Failed to copy Room ID");
        console.error(err);
    }
}
function leaveRoom() {
  reactNavigator("/");
}

function downloadCode() {
  if (!codeRef.current) {
      toast.error("No code available to download");
      return;
  }
  const element = document.createElement("a");
  const file = new Blob([codeRef.current], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "code.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FAFAFA", paddingX: 2, borderBottom: '5px solid rgb(152, 83, 242)' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Button Section */}
        <Button sx={{ color: 'rgb(152, 83, 242)' }} onClick={copyRoomId} ><SensorsIcon sx={{ fontSize: '40px'}} /></Button>
        <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
        <Button sx={{ color: 'rgb(152, 83, 242)' }} onClick={copyRoomId}>
    <ContentCopyIcon />
  </Button>
  <Button sx={{ color: 'rgb(152, 83, 242)' }} onClick={leaveRoom}>
    <ExitToAppIcon />
  </Button>
  <Button sx={{ color: 'rgb(152, 83, 242)' }} onClick={downloadCode}>
    <DownloadIcon />
  </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

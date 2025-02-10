import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Chip from "@mui/material/Chip";

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
    <AppBar position="static" sx={{ backgroundColor: "#1c1e29", paddingX: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Recent Editors Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AvatarGroup max={4}>
            {recentEditors.map((editor, index) => (
              <Avatar key={index} sx={{ width: 32, height: 32, bgcolor: "#007ACC" }}>
                {editor.username.charAt(0).toUpperCase()}
              </Avatar>
            ))}
          </AvatarGroup>
          <Chip label="Recent Editors" color="primary" variant="outlined" sx={{ fontSize: 12 }} />
        </Box>

        {/* Button Section */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" onClick={copyRoomId}><ContentCopyIcon /></Button>
          <Button color="inherit" onClick={leaveRoom}><ExitToAppIcon /></Button>
          <Button color="inherit" onClick={downloadCode}><DownloadIcon /></Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

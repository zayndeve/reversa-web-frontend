import React, { useState } from "react";
import "../../css/accountPage.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LoyaltyIcon from "@mui/icons-material/Loyalty"; // 🟢 NEW for points
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useGlobal } from "../../hooks/useGlobal";
import { serverApi } from "../../libs/config";

const UserInfoPage = () => {
  const { authMember: member } = useGlobal();

  const [memberImage, setMemberImage] = useState<string>(
    member?.memberImage
      ? `${serverApi}/uploads/members/${member.memberImage.replace(/^\/+/, "")}`
      : "/icons/default-user.svg"
  );

  const fullName = String(member?.memberNick || "Your Name");
  const email = String(member?.memberEmail || "No data");
  const phone = String(member?.memberPhone || "No data");
  const address = String(member?.memberAddress || "No data");
  const points = String(member?.memberPoints ?? "0");
  const status = String(member?.memberStatus || "No data");

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome {fullName}!</h2>
      <p className="dashboard-subtitle">Manage your personal info</p>

      <div className="profile-section">
        <div className="profile-image-card">
          <div className="profile-img-wrapper">
            <img src={memberImage} alt="Profile" className="profile-img" />
            <label htmlFor="upload-photo" className="upload-icon">
              <CameraAltIcon fontSize="small" />
            </label>
            <input type="file" id="upload-photo" hidden />
          </div>
          <div className="profile-name">{fullName}</div>
          <div className="profile-role">{status}</div>
        </div>

        <div className="info-fields">
          <div className="field-box">
            <label><EmailIcon fontSize="small" /> Email Address</label>
            <div>{email}</div>
          </div>
          <div className="field-box">
            <label><PhoneIcon fontSize="small" /> Phone Number</label>
            <div>{phone}</div>
          </div>
          <div className="field-box">
            <label><HomeIcon fontSize="small" /> Address</label>
            <div>{address}</div>
          </div>
          <div className="field-box">
            <label><LoyaltyIcon fontSize="small" /> Member Points</label>
            <div>{points}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;

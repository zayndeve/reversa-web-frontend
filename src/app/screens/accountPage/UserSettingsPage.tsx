import React, { useState } from "react";
import AccountSidebar from "./AccountSidebar";
import UserInfoPage from "./UserInfoPage";
import Orders from "./Orders";
import { useGlobal } from "../../hooks/useGlobal";
import { serverApi } from "../../libs/config";
import "../../css/accountPage.css";
import MemberService from "../../../app/service/MemberService";
import ProductsBanner from "../productListPage/ShopBanner";
 // ✅ use dynamic banner

const UserSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const { authMember, setAuthMember } = useGlobal();
  const memberService = new MemberService();

  type FormState = {
    memberNick: string;
    memberEmail: string;
    memberPhone: string;
    memberAddress: string;
  };

  const [form, setForm] = useState<FormState>({
    memberNick: authMember?.memberNick || "",
    memberEmail: typeof authMember?.memberEmail === "string" ? authMember.memberEmail : "",
    memberPhone: authMember?.memberPhone || "",
    memberAddress: authMember?.memberAddress || "",
  });

  const [preview, setPreview] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/uploads/members/${authMember.memberImage}?v=${Date.now()}`
      : "/icons/default-user.svg"
  );

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
      setPreview(URL.createObjectURL(uploaded));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, String(value))
    );
    if (file) formData.append("memberImage", file);

    try {
      await memberService.updateMemberProfile(formData);

      const refreshed = await memberService.getMyDetails();
      setAuthMember(refreshed);
      setPreview(
        refreshed.memberImage
          ? `${serverApi}/uploads/members/${refreshed.memberImage}?v=${Date.now()}`
          : "/icons/default-user.svg"
      );
      setForm({
        memberNick: refreshed.memberNick || "",
        memberEmail: refreshed.memberEmail || "",
        memberPhone: refreshed.memberPhone || "",
        memberAddress: refreshed.memberAddress || "",
      });

      alert("✅ Profile updated!");
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("❌ Failed to update profile.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "userinfo":
        return <UserInfoPage />;
      case "orders":
        return <Orders />;
      case "settings":
        return (
          <div className="dashboard-container">
            <h2 className="dashboard-title">Account Settings</h2>
            <p className="dashboard-subtitle">Update your personal info</p>

            <form onSubmit={handleSubmit} className="profile-section">
              <div className="profile-image-card">
                <div className="profile-img-wrapper">
                  <img src={preview} alt="Preview" className="profile-img" />
                  <label htmlFor="photo-upload" className="upload-icon">📷</label>
                  <input
                    id="photo-upload"
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="profile-name">{form.memberNick}</div>
              </div>

              <div className="info-fields">
                <div className="field-box">
                  <label>Name</label>
                  <input
                    type="text"
                    name="memberNick"
                    value={form.memberNick}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-box">
                  <label>Email</label>
                  <input
                    type="email"
                    name="memberEmail"
                    value={form.memberEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-box">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="memberPhone"
                    value={form.memberPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-box">
                  <label>Address</label>
                  <input
                    type="text"
                    name="memberAddress"
                    value={form.memberAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-box" style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" className="pay-btn">Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        );
      default:
        return <UserInfoPage />;
    }
  };

  return (
    <>
      <ProductsBanner /> {/* ✅ Banner added here */}
      <div className="account-wrapper" style={{ display: "flex", padding: "40px", gap: "30px" }}>
        <AccountSidebar onSelect={setActiveTab} activeTab={activeTab} />
        <div className="account-main" style={{ flex: 1 }}>{renderContent()}</div>
      </div>
    </>
  );
};

export default UserSettingsPage;

import axios from "axios";
import { serverApi } from "../libs/config";
import { Member } from "../libs/types/member";

class MemberService {
  private readonly path = serverApi;

  public async updateMemberProfile(formData: FormData): Promise<Member> {
    const url = `${this.path}/api/member/update-self`;
    const result = await axios.post(url, formData, {
      withCredentials: true, // ✅ Send session cookie
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const updated: Member = result.data.data || result.data; // backend wraps data
    localStorage.setItem("memberData", JSON.stringify(updated));
    return updated;
  }

  public async getMyDetails(): Promise<Member> {
    try {
      const url = `${this.path}/api/member/member-self`;
      console.log("🔐 getMyDetails: Calling", url);
      console.log("🔐 getMyDetails: Cookies available:", document.cookie);
      console.log("🔐 getMyDetails: withCredentials enabled in request");

      const result = await axios.get(url, {
        withCredentials: true, // ✅ Send session cookie with request
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      console.log("🔐 getMyDetails: SUCCESS! Status:", result.status);
      console.log("🔐 getMyDetails: Response data:", result.data);
      const member: Member = result.data;
      localStorage.setItem("memberData", JSON.stringify(member)); // ✅ Keep localStorage in sync
      return member;
    } catch (error: any) {
      console.error(
        "🔐 getMyDetails: FAILED with status",
        error.response?.status
      );
      console.error("🔐 getMyDetails: Response data:", error.response?.data);
      console.error("🔐 getMyDetails: Error message:", error.message);
      console.error("🔐 getMyDetails: Request config:", error.config);
      console.warn(
        "🔐 DIAGNOSIS: Backend returned 401 - session not recognized"
      );
      console.warn("🔐 Possible causes:");
      console.warn("  1. Backend session middleware not configured");
      console.warn("  2. Backend not setting session cookie on login");
      console.warn("  3. CORS not allowing credentials");
      console.warn("  4. Session expired or invalid");
      // Session is invalid, let the validation logic handle it
      throw error;
    }
  }

  public loadLocalMember(): Member | null {
    const data = localStorage.getItem("memberData");
    try {
      return data ? (JSON.parse(data) as Member) : null;
    } catch (err) {
      console.warn("Invalid localStorage member data");
      return null;
    }
  }

  public clearLocalMember(): void {
    localStorage.removeItem("memberData");
  }
}

export default MemberService;

import axios from "axios";
import { serverApi } from "../libs/config";
import { Member } from "../libs/types/member";

class MemberService {
  private readonly path = serverApi;

  public async updateMemberProfile(formData: FormData): Promise<Member> {
    const url = `${this.path}/api/member/update-self`;
    const result = await axios.post(url, formData, {
      withCredentials: true, // keep session cookie for ASP.NET
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
      const result = await axios.get(url, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      const member: Member = result.data;
      localStorage.setItem("memberData", JSON.stringify(member)); // ✅ Keep localStorage in sync
      return member;
    } catch (error) {
      console.warn(
        "Member detail endpoint not available, using localStorage data:",
        error
      );
      // Return localStorage data as fallback
      return this.loadLocalMember() || ({} as Member);
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

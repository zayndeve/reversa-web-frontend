import axios from "axios";
import { serverApi } from "../libs/config";
import { Member } from "../libs/types/member";

class MemberService {
  private readonly path = serverApi;

  public async updateMemberProfile(formData: FormData): Promise<Member> {
    const url = `${this.path}/api/member/update`;
    const result = await axios.post(url, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const updated: Member = result.data;
    localStorage.setItem("memberData", JSON.stringify(updated));
    return updated;
  }

  public async getMyDetails(): Promise<Member> {
    const url = `${this.path}/api/member/detail`;
    const result = await axios.get(url, {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const member: Member = result.data;
    localStorage.setItem("memberData", JSON.stringify(member)); // ✅ Keep localStorage in sync
    return member;
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

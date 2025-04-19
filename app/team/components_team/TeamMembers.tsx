import Link from "next/link";
import { FiUser, FiMail, FiExternalLink } from "react-icons/fi";

interface TeamMember {
  id: string;
  name: string;
  email: string;
}

interface TeamMembersProps {
  teamId: string;
}

const TeamMembers = ({ teamId }: TeamMembersProps) => {
  // Default team members data
  console.log(teamId);
  const teamMembers: TeamMember[] = [
    {
      id: "24",
      name: "أحمد محمد",
      email: "ahmed@example.com",
    },
    {
      id: "2",
      name: "سارة علي",
      email: "sara@example.com",
    },
    {
      id: "3",
      name: "خالد عبدالله",
      email: "khaled@example.com",
    },
  ];

  return (
    <div className="space-y-4">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 rounded-full bg-violet-600 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-violet-700 rounded-full">
              <FiUser className="text-xl" />
            </div>
            <span className="font-medium">{member.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${member.email}`}
              className="p-2 bg-violet-700 hover:bg-violet-800 rounded-full transition-colors"
              title="إرسال بريد إلكتروني"
            >
              <FiMail />
            </a>

            <Link
              href={`/user/sharing/${member.id}`}
              className="p-2 bg-violet-700 hover:bg-violet-800 rounded-full transition-colors"
              title="عرض الصفحة الشخصية"
            >
              <FiExternalLink />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
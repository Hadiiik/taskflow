import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
import fetchTeams from "@/client_helpers/fetch_admin_teams";

interface Team {
  id: string;
  name: string;
  description: string;
}

const TheAdminTeams: React.FC = () => {
  // بيانات الفرق الثابتة داخل المكون
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(()=>{
    const fetch_teams = async () => {
      const result = await fetchTeams();
      console.log(result)
      if (result.success) {
        const newteams: Team[] = result.teams.map((team: any) => ({
          id: team.team_id.toString(),
          name: team.team_name,
          description: team.team_info_object?.team_description || "",
        }));
        setTeams(newteams);
      }
      return result; // Ensure the result is returned
    };

    const storedTeams = sessionStorage.getItem("teams");
    if (storedTeams) {
      const parsedTeams = JSON.parse(storedTeams);
      setTeams(
      parsedTeams.map((team: any) => ({
        id: team.team_id,
        name: team.team_name,
        description: team.team_info_object?.team_description || "", // Add a default description if not available
      }))
      );
    } else {
      const fetchAndStoreTeams = async () => {
        const result = await fetch_teams();
        sessionStorage.setItem("teams", JSON.stringify(result.teams));
      };
      fetchAndStoreTeams();
    }

    
  },[])

  return (
    <div className="flex flex-col gap-3 p-4 w-full">
      {teams.length > 0 ? (
        <>
            <h2 className="text-right text-lg font-medium text-violet-700 mb-2">
            قم بإدارة فرقك من هنا
            </h2>
            {[...teams].reverse().map((team, i) => (
            <Link
              key={i}
              href={`/Admin/${team.id}`}
              passHref
              legacyBehavior
            >
              <a className="block w-full">
                <div className="p-3 border-2 border-violet-200 rounded-full flex flex-row-reverse items-center hover:bg-violet-50 transition-colors duration-200">
                  <div className="flex items-center justify-center w-10 h-10 bg-violet-100 rounded-full mr-2">
                    <FaUsers className="text-violet-500 w-5 h-5" />
                  </div>
                  <div className="flex flex-col justify-center mr-4 text-right flex-1">
                    <span className="text-violet-700 font-medium text-sm md:text-base">
                      {team.name}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {team.description}
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">لا يوجد فرق خاصة بك</p>
        </div>
      )}
    </div>
  );
};

export default TheAdminTeams;
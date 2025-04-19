"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { checkInvite } from "@/client_helpers/accsepet_invite";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inviteToken = searchParams.get("inviteToken");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyInvite = async () => {
      if (!inviteToken) {
        setErrorMessage("رمز الدعوة غير موجود.");
        setIsLoading(false);
        return;
      }

      const result = await checkInvite(inviteToken);

      if (result.success) {
        // إذا كانت الدعوة صالحة، قم بإعادة التوجيه إلى صفحة الفريق
        localStorage.setItem("current_team_id", result.team_id);
        router.push(`/team/${result.team_id}`);
      } else {
        // إذا كانت الدعوة غير صالحة، عرض رسالة خطأ
        setErrorMessage("الدعوة غير صالحة.");
        setIsLoading(false);
      }
    };

    verifyInvite();
  }, [inviteToken, router]);

  const handlePopupClose = () => {
    router.back(); // العودة إلى الصفحة السابقة
  };

  return (
    <>
      {isLoading && <TaskLoader />}
      {!isLoading && errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-red-600 font-bold mb-4">{errorMessage}</p>
            <button
              onClick={handlePopupClose}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg"
            >
              موافق
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

const TaskLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-40 h-40 rounded-full bg-violet-300 opacity-70 animate-pulse flex items-center justify-center shadow-xl">
        <span className="text-2xl font-bold text-violet-700 animate-pulse">
          TaskFlow
        </span>
      </div>
    </div>
  );
};

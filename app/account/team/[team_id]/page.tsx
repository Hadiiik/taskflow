import { cookies } from 'next/headers';
import React from 'react';

type Params = { team_id: string | number };

const Page = async ({ params }: { params: Params }) => {
  // استخدام await للحصول على الكوكيز
  const cookieStore = await cookies();
  const jwt = cookieStore.get('jwt')?.value || null;

  return (
    <div>
      <p>Team ID: {params.team_id}</p>
      <p>JWT: {jwt ? jwt : "No JWT available"}</p>
    </div>
  );
};

export default Page;

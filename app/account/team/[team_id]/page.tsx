import { cookies } from 'next/headers';
import React from 'react';

type Params = { team_id: number | string };

const Page = async ({ params }: { params: Params }) => {
  // الوصول إلى الكوكيز من الخادم
  const jwt = (await cookies()).get('jwt')?.value || null;
  

  return (
    <div>
      <p>Team ID: {params.team_id}</p>
      <p>JWT: {jwt ? jwt : "No JWT available"}</p>
    </div>
  );
};

export default Page;

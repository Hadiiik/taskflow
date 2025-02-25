

type Params = { team_id: string | number };

const Page = async ({ params }: { params: Params }) => {

  return (
    <div>
      <p>Team ID: {params.team_id}</p>
    </div>
  );
};

export default Page;

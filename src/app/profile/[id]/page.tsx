import React from "react";

const userProfile = ({ params }: any) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      Profile 2<p>{params.id}</p>
    </div>
  );
};

export default userProfile;

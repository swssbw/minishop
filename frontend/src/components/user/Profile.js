import React from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profileWrap">
          <MetaData title={"Your Profile"} />
          <h1 className="sectionTitle">My Profile</h1>
          <div className="">
            <div className="infoWrap">
              <h4>Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

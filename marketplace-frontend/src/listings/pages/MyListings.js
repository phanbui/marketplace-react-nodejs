import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import MiddleWrapper from "../../shared/components/MiddleWrapper";
import ListingCardList from "../components/ListingCardList";

const MyListings = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/listings/mylistings", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          auth.logout();
          navigate("/users/login");
        } else {
          setListings(data);
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <MiddleWrapper>
      {!isLoading && (
        <ListingCardList listings={listings} change={setListings} />
      )}
    </MiddleWrapper>
  );
};

export default MyListings;

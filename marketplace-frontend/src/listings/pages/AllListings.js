import React, { useEffect, useState, useRef } from "react";

import MiddleWrapper from "../../shared/components/MiddleWrapper";
import ListingCardList from "../components/ListingCardList";

const AllListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/listings")
      .then((response) => response.json())
      .then((data) => {
        setListings(data);
        setIsLoading(false);
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

export default AllListings;

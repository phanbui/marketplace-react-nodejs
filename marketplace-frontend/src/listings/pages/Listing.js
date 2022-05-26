import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import MiddleWrapper from "../../shared/components/MiddleWrapper";
import ListingCard from "../components/ListingCard";

const Listing = (props) => {
  const listingId = useParams().listingId;

  const [listing, setListing] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + `/listings/${listingId}`)
      .then((response) => response.json())
      .then((data) => {
        setListing(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <MiddleWrapper>
      {!isLoading && (
        <ListingCard
          key={listing._id}
          id={listing._id}
          title={listing.title}
          price={listing.price}
          condition={listing.condition}
          description={listing.description}
          postalCode={listing.postalCode}
          email={listing.email}
          seller={listing.seller}
          images={listing.images}
          detailedInfo={true}
          change={setListing}
        />
      )}
    </MiddleWrapper>
  );
};

export default Listing;

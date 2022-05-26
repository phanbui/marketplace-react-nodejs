import React from "react";

import ListingCard from "./ListingCard";

const ListingCardList = (props) => {
  return (
    <div>
      {props.listings.map((listing) => (
        <ListingCard
          key={listing._id}
          id={listing._id}
          title={listing.title}
          price={listing.price}
          email={listing.email}
          seller={listing.seller}
          images={listing.images}
          change={props.change}
          detailedInfo={false}
        />
      ))}
    </div>
  );
};

export default ListingCardList;

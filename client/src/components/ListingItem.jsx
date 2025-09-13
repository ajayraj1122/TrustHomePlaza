// import { Link } from 'react-router-dom';
// import { MdLocationOn } from 'react-icons/md';

// export default function ListingItem({ listing }) {
//   return (
//     <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
//       <Link to={`/listing/${listing._id}`}>
//         <img
//           src={
//             listing.imageUrls[0] ||
//             'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
//           }
//           alt='listing cover'
//           className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
//         />
//         <div className='p-3 flex flex-col gap-2 w-full'>
//           <p className='truncate text-lg font-semibold text-slate-700'>
//             {listing.name}
//           </p>
//           <div className='flex items-center gap-1'>
//             <MdLocationOn className='h-4 w-4 text-green-700' />
//             <p className='text-sm text-gray-600 truncate w-full'>
//               {listing.address}
//             </p>
//           </div>
//           <p className='text-sm text-gray-600 line-clamp-2'>
//             {listing.description}
//           </p>
//           <p className='text-slate-500 mt-2 font-semibold '>
//             $
//             {listing.offer
//               ? listing.discountPrice.toLocaleString('en-US')
//               : listing.regularPrice.toLocaleString('en-US')}
//             {listing.type === 'rent' && ' / month'}
//           </p>
//           <div className='text-slate-700 flex gap-4'>
//             <div className='font-bold text-xs'>
//               {listing.bedrooms > 1
//                 ? `${listing.bedrooms} beds `
//                 : `${listing.bedrooms} bed `}
//             </div>
//             <div className='font-bold text-xs'>
//               {listing.bathrooms > 1
//                 ? `${listing.bathrooms} baths `
//                 : `${listing.bathrooms} bath `}
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaParking, FaChair } from 'react-icons/fa';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
     

      {/* listings results */}

      {/* Offer listings */}
      {offerListings && offerListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>
              Recent offers
            </h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
              Show more offers
            </Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {offerListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

      {/* Rent listings */}
      {rentListings && rentListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>
              Places for rent
            </h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
              Show more places for rent
            </Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}

      {/* Sale listings */}
      {saleListings && saleListings.length > 0 && (
        <div className=''>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>
              Places for sale
            </h2>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
              Show more places for sale
            </Link>
          </div>
          <div className='flex flex-wrap gap-4'>
            {saleListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg w-[300px] sm:w-[250px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] && listing.imageUrls[0].startsWith('/uploads')
              ? `${window.location.origin}${listing.imageUrls[0]}`
              : listing.imageUrls[0] ||
                'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
      </Link>
      <div className='p-4 flex flex-col gap-2 w-full'>
        <p className='truncate font-semibold text-lg text-slate-700'>
          {listing.name}
        </p>
        <div className='flex items-center gap-1'>
          <span className='text-slate-400 text-sm flex items-center gap-1'>
            <FaBath />
            {listing.bathrooms} baths
          </span>
          <span className='text-slate-400 text-sm flex items-center gap-1'>
            <FaBed />
            {listing.bedrooms} beds
          </span>
          <span className='text-slate-400 text-sm flex items-center gap-1'>
            <FaParking />
            {listing.parking ? 'Parking' : 'No Parking'}
          </span>
          <span className='text-slate-400 text-sm flex items-center gap-1'>
            <FaChair />
            {listing.furnished ? 'Furnished' : 'Unfurnished'}
          </span>
        </div>
        <p className='text-slate-500 mt-2 font-semibold'>
          ${listing.regularPrice}
          {listing.type === 'rent' && ' / month'}
        </p>
        {listing.offer && (
          <p className='text-green-900 font-semibold'>
            ${listing.discountPrice} Discount
          </p>
        )}
      </div>
    </div>
  );
}
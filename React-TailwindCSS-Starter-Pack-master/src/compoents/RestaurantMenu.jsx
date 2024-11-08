import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RestaurantMenu() {
  const { id } = useParams();
  const [resInfo, setResInfo] = useState({});
  const [menu, setMenuData] = useState("");
  const [discountData, setDiscountData] = useState([]);

  async function fetchMenu() {
    try {
      const response = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.95250&lng=75.71050&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`);
      const result = await response.json();

      console.log(result?.data?.cards[2]?.card?.card?.info || {});

      setResInfo(result?.data?.cards[2]?.card?.card?.info || {});  // Ensure resInfo is an object
      setDiscountData(result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || []);
      setMenuData(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || "");
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className='w-full'>
      <div className='w-[800px] mx-auto p-8'>
        <p className='text-[12px] text-slate-500'>
          <Link to="/">
            <span className='text-slate-300 hover:cursor-pointer'>Home</span> /
          </Link>
          {resInfo.city ? (
            <Link to="/">
              <span className='text-slate-300 hover:cursor-pointer'> {resInfo.city}</span> /
            </Link>
          ) : (
            <span>Loading...</span>
          )}
          <span className='text-slate-600'>{resInfo.name}</span>
        </p>
        <p className=' font-extrabold text-[24px] leading-[28px] tracking-[-0.4px] text-[rgba(2,6,12,0.92)] mt-9'>{resInfo.name} </p>
        <div className='w-full h-[206px] bg-gradient-to-t p-5 from-slate-200/70   mt-3 rounded-[30px]'>
          <div className='w-full border p-4 border-slate-200/70 rounded-[30px] h-full bg-white'>
            <div className='flex items-center gap-1'>
              <i className='fi fi-ss-circle-star  text-green-600 text-lg mt-1'></i>
              <span className=" font-semibold ">{resInfo.avgRating}</span>
              <span className="font-semibold">({resInfo.totalRatingsString})</span>
              <span className="text-slate-400 ">•</span>
              <span className="font-semibold">{resInfo.costForTwoMessage}</span>
            </div>
            <p className='text-base underline text-orange-500 font-bold cursor-pointer'>{resInfo.cuisines ? resInfo.cuisines.join(', ') : "Loading..."}</p>
            <div className="flex gap-1 mt-2">
              <div className="w-[9px] flex flex-col justify-center items-center">
                <div className="w-[7px] h-[7px] bg-gray-400 rounded-full"></div>
                <div className="w-[1px] h-[25px] bg-gray-400 "></div>
                <div className="w-[7px] h-[7px] bg-gray-400 rounded-full"></div>
              </div>
              <div className='flex flex-col gap-3'>
                <p className='font-bold text-sm mt-2 justify-center' >Outlet <span className='text-slate-500 text-sm ml-3'>{resInfo.areaName}</span></p> 
                <p className='mb-3 font-medium text-sm justify-center'>{resInfo?.sla?.slaString}</p>
              </div>
           
            </div>

          </div>
        </div>
        <div className='mt-6'>Deals for you</div>
      </div>
    </div>
  );
}

export default RestaurantMenu;

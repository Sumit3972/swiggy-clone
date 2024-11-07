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

      console.log(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card);

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
            <span className='text-slate-700 hover:cursor-pointer'>Home</span> /
          </Link>
          {resInfo.city ? (
            <Link to="/">
              <span className='text-slate-700 hover:cursor-pointer'> {resInfo.city}</span> /
            </Link>
          ) : (
            <span>Loading...</span>
          )}
          <span className='text-slate-700'>{resInfo.name}</span>
        </p>
        <p className='font-bold pt-6 text-2xl'>{resInfo.name} </p>
        <div className='w-full h-[206px] bg-gradient-to-t p-5 from-slate-200/70   mt-3 rounded-[30px]'>
          <div className='w-full border p-4 border-slate-200/70 rounded-[30px] h-full bg-white'>
            <i className='fi fi-ss-circle-star mt-1 text-green-600 text-lg'></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;

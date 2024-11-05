import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function RestaurantMenu() {
    const { id } = useParams();
  const [menu,menudata] = useState("");

  let mainid = id.split("-").at(-1);
 


  async function fetchmenu() {
        let data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.9525&lng=75.7105&restaurantId=${mainid}&catalog_qa=undefined&submitAction=ENTER`)
        let result = await data.json()
        console.log(result)
        menudata(result?.data?.cards[0]?.card?.card?.text)
  }


  useEffect(()=>{
     fetchmenu()
  },[])

  return (
    <div>RestaurantMenu {mainid}</div>
  )
}

export default RestaurantMenu
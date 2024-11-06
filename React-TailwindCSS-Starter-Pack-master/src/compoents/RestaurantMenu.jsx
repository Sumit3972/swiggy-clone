import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function RestaurantMenu() {
  const { id } = useParams();
  const [resInfo, setresInfo] = useState([]);
  const [menu, menudata] = useState("");
  const [discountData, setDiscountdata] = useState([]);





  async function fetchmenu() {
    let data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.95250&lng=75.71050&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`)

    let result = await data.json()
    console.log(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)
    //menudata(result?.data?.cards[0]?.card?.card?.text)
    setresInfo(result?.data?.cards[2]?.card.card?.info)
    setDiscountdata(result?.data?.cards[3]?.card.card?.gridElements?.infoWithStyle?.offers)
    menudata(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.card[1]?.card?.card)
  }
  useEffect(() => {
    fetchmenu()
  }, [])

  return (
    <div>RestaurantMenu {id}</div>
  )
}

export default RestaurantMenu
import { useState, useEffect } from "react"

type Props = {
  itemId: number
}

const GetAnItemData = async (props: Props) => {
  let itemData
  let getSuccess = false
  if (!props.itemId) return

  // itemDataに型をつけられると良い感じです！
  await fetch(`http://localhost:50000/getItemData/${props.itemId}`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res)
      return res.json()
    })
    .then((data) => {
      console.log(data)
      itemData = data
      getSuccess = true
    })
    .catch((error) => {
      console.error("Error:", error)
    })

  return { itemData, getSuccess }
}

export default GetAnItemData

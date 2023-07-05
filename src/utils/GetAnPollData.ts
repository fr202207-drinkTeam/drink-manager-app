import { useState, useEffect } from "react"


const GetAnPollData = async (id:number|null) => {
  let pollData
  let getSuccess = false
  if (!id) return

  await fetch(`http://localhost:50000/pollsdata/${Number(id)}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      pollData = data
      getSuccess = true
    })
    .catch((error) => {
      console.error("Error:", error)
    })

  return { pollData, getSuccess }
}

export default GetAnPollData
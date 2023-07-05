import { useState, useEffect } from "react"

const GetAnQuestionnaireData = async (id:number|null) => {
  let questionnaireData
  let getSuccess = false
  if (!id) return

  await fetch(`http://localhost:50000/questionnairesresult/${Number(id)}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      questionnaireData = data
      getSuccess = true
    })
    .catch((error) => {
      console.error("Error:", error)
    })

  return { questionnaireData, getSuccess }
}

export default GetAnQuestionnaireData
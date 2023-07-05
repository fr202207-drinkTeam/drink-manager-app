import { useState, useEffect } from "react"

const GetAllQuestionnaireData = async () => {
  let questionnaireData
  let getSuccess = false

  await fetch(`http://localhost:50000/questionnaires`)
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

export default GetAllQuestionnaireData
type Props = {
  questionnaireId: number,
  userId: number | null,
  category: number,
  result: number,
};

const PostPoll = async (data: Props) => {
let success = false;
await fetch("http://localhost:50000/poll", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then(() => {
    success = true;
  })
  .catch((error) => {
    console.error("Error:", error);
    if (error) {
      success = true;
    }
  });

  return success;
};

export default PostPoll;
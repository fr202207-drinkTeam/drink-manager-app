type Props = {
  questionnaireId: number,
  userId: number | null,
  category: number,
  result: number,
};

const PostPoll = async (data: Props) => {
  let success = false;
  if (!data.userId) return;
  try {
    const response = await fetch("http://localhost:50000/poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      success = true;
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return success;
};

export default PostPoll;
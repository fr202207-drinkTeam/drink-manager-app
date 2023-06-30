type QuestionnairProps = {
  name: string;
  Polleditems:{
    itemId: number;
}[];
  description: string;
  createdAt: Date;
  category: number;
  startDate: Date;
  endDate: Date;
  author:number | null;
};

const PostQuestionnair = async (data: QuestionnairProps) => {
let success = false;
await fetch("http://localhost:50000/questionnaires", {
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

export default PostQuestionnair;
const GetInTheOfficeItems = async() => {    
    return await fetch(`http://localhost:50000/intheofficeitems`, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log(error);
    });
};

export default GetInTheOfficeItems;
  
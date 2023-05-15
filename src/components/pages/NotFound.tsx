import { Box, Link } from "@mui/material";

const NotFound =()=>{
  return(
    <>
    <Box sx={{fontSize:"50px",textAlign:"center",pt:40}}>お探しのページは見つかりません。</Box>
    <Box sx={{textAlign:"center"}}>
    <Link sx={{p:2}}  href={`/home`}>TOPへ戻る</Link>
    </Box>
    </>
  )
}

export default NotFound;
import { Box, ListItem, ListItemText } from '@mui/material'
import { FC } from 'react'
import { ActiveBeigeButton } from '../../atoms/button/Button'
import { useNavigate } from 'react-router-dom'
import { Questionnaire } from '../../../types/type'
import useGetQuestionnaire from '../../../hooks/useGetQuestipnnaire'
import useGetPollLatestTitle from '../../../hooks/useGetPollLatestTitle'

type PollAgendaProps = {
  pollTitle: Questionnaire[]
}

const PollAgenda: FC<PollAgendaProps> = ({ pollTitle }) => {
  const navigate = useNavigate()
  const pollData: Questionnaire[] = useGetQuestionnaire()
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          fontSize: "30px",
          mt: 5,
          maxWidth: 600,
          minWidth: 600,
        }}
      >
        ＼現在開催中の
        <span
          style={{ fontSize: "40px", fontWeight: "bold", color: "#F3BF87" }}
        >
          &nbsp;投票&nbsp;
        </span>
        はこちら／
      </Box>

      <Box>

        {(pollTitle[0]?.endDate >= now || pollTitle[1]?.endDate >= now )? (
            pollTitle.map((title, index) => (
            <Box key={index}>
              {title?.endDate >= now ? (
              <Box sx={{ textAlign: "center" }}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    maxWidth: 700,
                    minWidth: 700,
                    mt: 1,
                  }}
                  button
                  component="a"
                  href={index === 0 ? `#popular` : "#others"}
                >
                  <Box id="top" />
                  <ListItemText
                    primaryTypographyProps={{
                      textAlign: "center",
                      fontSize: "40px",
                      border: "double #C89F81",
                      p: 1,
                    }}
                  >
                    {title?.name}
                    <span
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        fontSize: "20px",
                        paddingBottom: 1,
                      }}
                    >
                      投票期間：
                      {title?.startDate.toLocaleDateString()}~
                      {title?.endDate.toLocaleDateString()}
                    </span>
                  </ListItemText>
                </ListItem>
              </Box>
                ):(<Box sx={{fontSize:"30px",my:5}}>{index+1===1?"人気投票":"その他投票"}は現在開催していません</Box>)}
            </Box>
            ))):(<Box sx={{fontSize:"30px",mb:6,mt:7}}>開催中の投票はありません</Box>)}
      </Box>

      {pollData.length >= 1 ?
        <Box sx={{ textAlign: "center", my: 5, mb: 10 }}>
          <ActiveBeigeButton
            event={() => navigate("/home/poll/pollresult")}
            style={{ padding: 15, width: 300, height: 80, fontSize: "23px" }}
          >
            過去の投票結果を見る!
          </ActiveBeigeButton>
        </Box>
        : <Box sx={{ height: 80 }}></Box>}
    </>
  )
}

export default PollAgenda
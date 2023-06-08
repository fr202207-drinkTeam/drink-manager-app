import { Box, ListItem, ListItemText,useTheme } from '@mui/material'
import { FC } from 'react'
import { ActiveBeigeButton } from '../../atoms/button/Button'
import { useNavigate } from 'react-router-dom'
import { Questionnaire } from '../../../types/type'
import useGetQuestionnaire from '../../../hooks/useGetQuestipnnaire'

type PollAgendaProps = {
  pollTitle: Questionnaire[]
}

const PollAgenda: FC<PollAgendaProps> = ({ pollTitle }) => {
  const navigate = useNavigate()
  const theme = useTheme();
  const pollData: Questionnaire[] = useGetQuestionnaire()
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: {
            xs: theme.typography.pxToRem(20),
            sm: theme.typography.pxToRem(25),
            md: "20px",
          },
          mt: 5,
          maxWidth: "100%",
        }}
      >
        ＼現在開催中の
        <span
          style={{
            fontSize: theme.typography.pxToRem(40),
            fontWeight: 'bold',
            color: '#F3BF87',
          }}
        >
          &nbsp;投票&nbsp;
        </span>
        はこちら／
      </Box>

      <Box>
        {pollTitle[0]?.endDate >= now || pollTitle[1]?.endDate >= now ? (
          pollTitle.map((title, index) => (
            <Box key={index}>
              {title?.endDate >= now ? (
                <Box sx={{ textAlign: 'center' }}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 1,
                      maxWidth: {
                        xs: theme.breakpoints.values.xs,
                        sm: theme.breakpoints.values.sm,
                        lg: theme.breakpoints.values.lg,
                      },
                      minWidth: 400,
                      mt: 1,
                    }}
                    button
                    component="a"
                    href={index === 0 ? `#popular` : '#others'}
                  >
                    <Box id="top" />
                    <ListItemText
                      primaryTypographyProps={{
                        textAlign: 'center',
                        fontSize: {
                          xs: "25px",
                          sm: "30px",
                          md: "40px",
                        },
                        border: 'double #C89F81',
                        p: 1,
                        px:4
                      }}
                    >
                      {title?.name}
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          fontSize: {
                            xs: theme.typography.pxToRem(16),
                            sm: theme.typography.pxToRem(18),
                            md: theme.typography.pxToRem(25),
                          },
                          paddingBottom: 1,
                        }}
                      >
                        投票期間：
                        {title?.startDate.toLocaleDateString()}~
                        {title?.endDate.toLocaleDateString()}
                      </Box>
                    </ListItemText>
                  </ListItem>
                </Box>
              ) : (
                <Box sx={{ fontSize: theme.typography.pxToRem(20), my: 5 }}>
                  {index + 1 === 1 ? '人気投票' : 'その他投票'}は現在開催していません
                </Box>
              )}
            </Box>
          ))
        ) : (
          <Box sx={{ fontSize: theme.typography.pxToRem(20), mb: 6, mt: 7 }}>
            開催中の投票はありません
          </Box>
        )}
      </Box>

      {pollData.length >= 1 ? (
        <Box sx={{ textAlign: 'center', my: 5, mb: 10 }}>
          <ActiveBeigeButton
            event={() => navigate('/home/poll/pollresult')}
            sxStyle={{
              p:2,
              letterSpacing: 2,
             fontSize: {
                xs: "12px",
                sm: "14px",
                md: "15px",
                lg: "18px",
                xl: "18px"
              }
            }}
          >
            過去の投票結果を見る
          </ActiveBeigeButton>
        </Box>
      ) : (
        <Box sx={{ height: 80 }}></Box>
      )}
    </>
  )
}

export default PollAgenda
import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import { useStyles } from '../../style/HospitalStyle'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Link } from '@material-ui/core'
import HospitalNeedList from './HospitalNeedList'
import MakersForm from '../makers/MakersForm'

const HospitalCard = ({ hospital }) => {
  const classes = useStyles()

  const [showDialog, setShowDialog] = useState(false)

  const handleContactClicked = () => {
    setShowDialog(true)
  }

  const handleDialogClosing = () => {
    setShowDialog(false)
  }

  return (
    <>
      <MakersForm open={showDialog} onClose={handleDialogClosing}/>
      <Grid item key={hospital.name} xs={6} sm={3} md={3} lg={3} xl={3}>
        <Card className={classes.card} >
          <CardContent className={classes.cardContent} align="left">
            <Box fontWeight="fontWeightBold">
              <Typography variant="h8" align="left">
                {hospital.name}
              </Typography> </Box>
            <HospitalNeedList needs = {hospital.needs}/>
            <Link onClick={handleContactClicked}>Contact</Link>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default HospitalCard

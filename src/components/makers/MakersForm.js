import React, { useState } from 'react'
import { connect } from 'react-redux'
import { sendEmail, resetEmailSendStatus } from '../../actions'
import Button from '@material-ui/core/Button'
import validateForm from './ValidateForm'
import { Paper, Grid, TextField, DialogTitle, Dialog, DialogContent, DialogContentText } from '@material-ui/core'

const MakersForm = ({ open, onClose, hospitalName, product, emailSentStatus, sendEmail, resetEmailSendStatus }) => {
  const [inputs, setInputs] = useState({})
  const [errors, setErrors] = useState({})

  const onChange = (event) => {
    console.log('Event', event.target.id, event.target.value)

    event.preventDefault()
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }))

    console.log('inputs: ', inputs)
  }

  const submitForm = (event) => {
    const validatoionsErrors = validateForm(inputs)

    setErrors(validatoionsErrors)

    if (Object.keys(validatoionsErrors).length === 0) {
      sendEmail(inputs)
    }
    event.preventDefault()
  }

  const handleSuccessDialogClosing = () => {
    resetEmailSendStatus()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>

      <Dialog open={emailSentStatus} onClose={handleSuccessDialogClosing} >
        <DialogContent>
          <DialogContentText>
            {emailSentStatus === 'OK' ? 'Email sent' : 'There was an error'}
          </DialogContentText>
        </DialogContent>

      </Dialog>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogContentText>
        Thank you for contacting hospital {hospitalName} in order to donate {product}
          <br />
          <br />
        In order for the hospital to be able to evaluate if your donation can be accepted or not,
        we kindly request you to include all the relevant information to this end, including if you
        hold any kind of certification or if you are using a model that has already
        been certified
        </DialogContentText>
        <form>
          <Paper style={{ padding: 45 }} elevation={0} >
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth required onChange={onChange} id ="FullName" type="text" label="Full Name" helperText={errors.fullName}/>

                <TextField fullWidth required onChange={onChange} id ="Telephone" type="tel" label="Telephone" inputProps={{ pattern: '^[6,7,8,9][0-9]{8}$' }} helperText={errors.telephone}/>

                <TextField fullWidth required onChange={onChange} id ="Email" type="email" label="Email" helperText={errors.email}/>

                <TextField fullWidth required onChange={onChange} id ="Amount" type="number" label="Amount" inputProps={{ min: 1 }} helperText={errors.amount}/>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth onChange={onChange} id ="Company" type="text" label="Company" />

                <TextField fullWidth onChange={onChange} id ="AdditionalTelephone" type="tel" label="Additional telephone" inputProps={{ pattern: '^[6,7,8,9][0-9]{8}$' }} helperText={errors.additionaTelephone}/>

                <TextField fullWidth onChange={onChange} id ="AdditionalEmail" type="email" label="Additional email" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth required onChange={onChange} id ="DonationInfo" type="text" label="Information about the donation" multiline rowsMax={5} helperText={errors.donationInfo}/>
              </Grid>
              <Grid item xs={12} align="right" style={{ paddingTop: 20, paddingRight: 80 }}>
                <Button onClick={submitForm} variant="contained" color="primary" type="submit">Submit</Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </DialogContent>
    </Dialog>

  )
}
const mapStateToProps = (state) => {
  return {
    emailSentStatus: state.emailSent
  }
}
export default connect(mapStateToProps, { sendEmail, resetEmailSendStatus })(MakersForm)

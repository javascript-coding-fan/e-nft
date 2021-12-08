import React, { Component } from 'react'
import emailjs from 'emailjs-com'
import styles from './ContactForm.module.scss'
import { withTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

export class ContactForm extends Component {
  state = {
    userName: '',
    emailAddress: '',
    companyName: '',
    message: '',
    error: {} as any,
    dialogMsg: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.validate()) return

    var templateParams = {
      from_name: this.state.userName,
      to_name: 'Administrator',
      company: this.state.companyName,
      email: this.state.emailAddress,
      message: this.state.message
    }

    emailjs
      .send(
        process.env.VITE_EMAILJS_SERVICE_ID,
        process.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.VITE_EMAILJS_USER_ID
      )
      .then(
        (_) => {
          this.displayDialog((this.props as any).t('creatorContact.lbl-success'))
        },
        (_) => {
          this.displayDialog((this.props as any).t('creatorContact.lbl-failure'))
        }
      )

    this.setState({
      userName: '',
      emailAddress: '',
      companyName: '',
      message: ''
    })
  }

  validate = (): boolean => {
    const error: {
      userName: string
      emailAddress: string
      message: string
    } = {} as any

    if (!this.state.userName) error.userName = (this.props as any).t('creatorContact.err-username')
    if (!this.state.emailAddress) error.emailAddress = (this.props as any).t('creatorContact.err-email')
    if (!this.state.message) error.message = (this.props as any).t('creatorContact.err-msg')

    this.setState({ error })

    return JSON.stringify(error) === '{}'
  }

  handleChange = (e) => {
    const error = this.state.error
    error[e.target.name] = ''
    this.setState({
      [e.target.name]: e.target.value,
      error
    })
  }

  displayDialog = (msg) => {
    this.setState({ dialogMsg: msg })
  }

  render() {
    const t = (this.props as any).t
    return (
      <div className={styles.emailDiv}>
        <p className={styles.emailTitle}>{t('creatorContact.header')}</p>
        <p className={styles.emailDetail}>{t('creatorContact.description')}</p>
        <div className={styles.formControl}>
          <label className={styles.inputLabel}>{t('creatorContact.lbl-name')}</label>
          <input
            type="text"
            className={styles.emailInput}
            value={this.state.userName}
            name="userName"
            onChange={this.handleChange}
          />
          {this.state.error.userName && <p className={styles.error}>{this.state.error.userName}</p>}
        </div>
        <div className={styles.formControl}>
          <label className={styles.inputLabel}>{t('creatorContact.lbl-email')}</label>
          <input
            type="text"
            className={styles.emailInput}
            value={this.state.emailAddress}
            name="emailAddress"
            onChange={this.handleChange}
          />
          {this.state.error.emailAddress && <p className={styles.error}>{this.state.error.emailAddress}</p>}
        </div>
        <div className={styles.formControl}>
          <label className={styles.inputLabel}>{t('creatorContact.lbl-company')}</label>
          <input
            type="text"
            className={styles.emailInput}
            value={this.state.companyName}
            name="companyName"
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label className={styles.inputLabel}>{t('creatorContact.lbl-project')}</label>
          <textarea
            className={styles.emailInput}
            value={this.state.message}
            name="message"
            onChange={this.handleChange}
          />
          {this.state.error.message && <p className={styles.error}>{this.state.error.message}</p>}
        </div>
        <div className={styles.btnContainer}>
          <button type="button" onClick={this.handleSubmit}>
            {t('creatorContact.lbl-send')}
          </button>
        </div>
        <Dialog open={!!this.state.dialogMsg} onClose={() => this.displayDialog('')}>
          <DialogContent className={styles.dialog}>
            <DialogContentText id="alert-dialog-description" className={styles.dialogText}>
              {this.state.dialogMsg}
            </DialogContentText>
            <button type="button" onClick={() => this.displayDialog('')}>
              {t('creatorContact.lbl-ok')}
            </button>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default withTranslation()(ContactForm)

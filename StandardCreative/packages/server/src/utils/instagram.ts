import fetch from 'node-fetch'
import axios from 'axios'
import * as queryString from 'query-string'
import { instagramAppId, instagramAppSecret, rapidApiHost, rapidApiKey } from '../settings'

const instagramClient = {
  getAccessToken: (code, redirect_uri) => {
    return new Promise((resolve) => {
      fetch(`https://api.instagram.com/oauth/access_token`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: queryString.stringify({
          client_id: instagramAppId,
          client_secret: instagramAppSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri
        })
      })
        .then((response) => {
          if (response.ok) {
            return response
          }
          throw Error(response.statusText)
        })
        .then((response) => response.json())
        .then((data) => {
          resolve({ success: true, data })
        })
        .catch((error) => {
          console.log(error)
          resolve({ success: false, error })
        })
    })
  },
  getUsername: (accessToken) => {
    return new Promise((resolve) => {
      fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`, {
        method: 'GET'
      })
        .then((response) => {
          if (response.ok) {
            return response
          }
          throw Error(response.statusText)
        })
        .then((response) => response.json())
        .then((data) => {
          resolve({ success: true, data })
        })
        .catch((error) => {
          console.log(error)
          resolve({ success: false, error })
        })
    })
  },
  getUserInfoRapid: (username) => {
    return new Promise((resolve) => {
      var options = {
        method: 'GET',
        url: 'https://instagram40.p.rapidapi.com/account-info',
        params: { username },
        headers: {
          // 'x-rapidapi-key': rapidApiKey,
          // 'x-rapidapi-host': rapidApiHost
          'x-rapidapi-key': '8ee3e510e1msh4c8472d29c267cbp19e813jsnf9c3d04a2315',
          'x-rapidapi-host': 'instagram40.p.rapidapi.com'
        }
      }

      axios // @ts-ignore
        .request(options)
        .then(function (response) {
          console.log(response.data)
          resolve({ success: true, data: response.data })
        })
        .catch(function (error) {
          console.log(error)
          resolve({ success: false, error })
        })
    })
  },
  getUserPostsByPagination: (userid, after) => {
    return new Promise((resolve) => {
      var options = {
        method: 'GET',
        url: 'https://instagram40.p.rapidapi.com/account-medias',
        params: {
          userid: userid,
          first: 3
        },
        headers: {
          'x-rapidapi-key': '8ee3e510e1msh4c8472d29c267cbp19e813jsnf9c3d04a2315',
          'x-rapidapi-host': 'instagram40.p.rapidapi.com'
        }
      }

      axios // @ts-ignore
        .request(options)
        .then(function (response) {
          resolve({ success: true, data: response.data })
        })
        .catch(function (error) {
          resolve({ success: false, error })
        })
    })
  },
  getPostByUrl: (url = 'https://www.instagram.com/p/CM_3VuynzOJ/') => {
    return new Promise((resolve) => {
      var options = {
        method: 'GET',
        url: 'https://instagram40.p.rapidapi.com/media-info-by-url',
        params: { url },
        headers: {
          'x-rapidapi-key': '8ee3e510e1msh4c8472d29c267cbp19e813jsnf9c3d04a2315',
          'x-rapidapi-host': 'instagram40.p.rapidapi.com'
        }
      }

      axios // @ts-ignore
        .request(options)
        .then(function (response) {
          resolve({ success: true, data: response.data })
        })
        .catch(function (error) {
          resolve({ success: false, error })
        })
    })
  }
}

export default instagramClient

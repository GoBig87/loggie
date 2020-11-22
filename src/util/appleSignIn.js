import axios from "axios";
import jsonwebtoken

// const express = require('express')
// const app = express()
// const path = require('path')
// const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken');
// const fs = require('fs')
// const querystring = require('querystring')

class AppleSignIn {
    constructor() {
    }

    getClientSecret = () => {
        // sign with RSA SHA256
        const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_FILE_PATH);
        const headers = {
            kid: process.env.KEY_ID,
            typ: undefined // is there another way to remove type?
        }
        const claims = {
            'iss': process.env.TEAM_ID,
            'aud': 'https://appleid.apple.com',
            'sub': process.env.CLIENT_ID,
        }

        token = jwt.sign(claims, privateKey, {
            algorithm: 'ES256',
            header: headers,
            expiresIn: '24h'
        });

        return token
    }

    getUserId = (token) => {
        const parts = token.split('.')
        try {
            return JSON.parse(new Buffer(parts[1], 'base64').toString('ascii'))
        } catch (e) {
            return null
        }
    }

    postAppleOath() {
        let clientSecret = getClientSecret()
        const requestBody = {
            grant_type: 'authorization_code',
            code: req.body.code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.CLIENT_ID,
            client_secret: clientSecret,
            scope: process.env.SCOPE
        }

        axios.request({
            method: "POST",
            url: "https://appleid.apple.com/auth/token",
            data: querystring.stringify(requestBody),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(response => {
            return res.json({
                success: true,
                data: response.data,
                user: getUserId(response.data.id_token)
            })
        }).catch(error => {
            return res.status(500).json({
                success: false,
                error: error.response.data
            })
        });
    }
}
export default AppleSignIn
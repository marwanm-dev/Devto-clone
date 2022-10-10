const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status('Something is missing');

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const token = jwt.sign({ username: foundUser.username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1m',
        });
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.json({ ...foundUser.toObject({ getters: true }), token });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const handleGoogleLogin = async (req, res) => {
    const { tokenId } = req.body;
    const response = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = response.getPayload();
    let existingUser;

    existingUser = await User.findOne({ email }, '-password');

    if (!existingUser) {
        const username = email.slice(0, email.indexOf('@'));
        try {
            const hashedPwd = await bcrypt.hash(email + username + email, 10);

            existingUser = await User.create({
                username,
                name,
                email,
                password: hashedPwd,
                picture: {
                    url: picture,
                },
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    res.json({ email: existingUser.email || email, username: existingUser.username || username });
};
const handleGithubLogin = async (req, res) => {
    const { code } = req.body;
    const response = await axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
        headers: {
            accept: 'application/json',
        },
    });
    const { access_token } = response.data;

    const { data } = await axios({
        url: `https://api.github.com/user`,
        headers: {
            Authorization: `token ${access_token}`,
        },
    });

    const { name, avatar_url, bio, location } = data;
    let email;

    if (data.emails) email = data.emails.find(email => email.primary && email.email);
    if (!data.emails) {
        const { data: emails } = await axios({
            url: `https://api.github.com/user/emails`,
            headers: {
                Authorization: `token ${access_token}`,
            },
        });

        if (!emails || emails.length === 0) {
            return;
        }

        email = emails.find(email => email.primary).email;
    }
    let existingUser;

    existingUser = await User.findOne({ email }, '-password');

    if (!existingUser) {
        const username = email.slice(0, email.indexOf('@'));
        try {
            const hashedPwd = await bcrypt.hash(email + username + email, 10);

            existingUser = await User.create({
                username,
                name,
                email,
                password: hashedPwd,
                picture: {
                    url: avatar_url,
                },
                bio,
                location,
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    res.json({ email: existingUser.email || email, username: existingUser.username || username });
};

module.exports = { handleLogin, handleGoogleLogin, handleGithubLogin };

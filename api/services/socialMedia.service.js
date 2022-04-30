const axios = require('axios');
    
const verifyToken = async (token, socialMedia) => {
    try {
        switch (socialMedia) {
            case "facebook":
                return await verifyFacebookToken(token);
        
            default:
                return null;
        }

    } catch (error) {
        return null;
    }
}

const verifyFacebookToken = async (token) => {
    const response = await axios.get(`https://graph.facebook.com/me?fields=email,name,id&access_token=${token}`);
    return response.data;
}

const getProfilePicture = async (id, socialMedia) => {
    let response = null;
    switch (socialMedia) {
        case "facebook":
            response = await axios.get(`https://graph.facebook.com/${id}/picture?type=large&redirect=false`);
            response = response.data.data.url;
            break;
        default: 
            break;
    }
    return response;
}

module.exports = {
    verifyToken,
    getProfilePicture,
};
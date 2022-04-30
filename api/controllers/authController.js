const { userService, authService, socialMediaService } = require('../services');

const register = async (req, res) => {
    try {
        const user = await userService.getByEmail(req.body.email);
        if(user) return res.status(409).send({error: "User already exists"});

        let newUser = await authService.register(req.body);
        newUser = await userService.create(newUser);
        const token = await authService.signToken(newUser._id);

        return res.status(201).send({token, user: newUser});
    } catch (error) {
        return res.status(500).send({msg: error.toString()})  
    }
}

const login = async (req, res) => {
    try {
        const user = await userService.getByEmail(req.body.email);
        if(!user) return res.status(403).send({error: 'Invalid credentials'});

        const token = await authService.login(user, req.body);
        if(token){
            return res.status(200).send({ token, user});
        }else {
            return res.status(403).send({Error: 'Invalid credentials'});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: error.toString()}) 
    }
}

const socialMediaLogin = async (req, res) => {
    try {
        const tokenData = await socialMediaService.verifyToken(req.query.token, req.body.socialMedia); 
        if(!tokenData) return res.status(403).send({error: 'Invalid credentials'});
        const { email, name, id } = tokenData;
        const profilePicture = await socialMediaService.getProfilePicture(id, req.body.socialMedia);
        let user = await userService.getByEmail(email);
        if(!user) user = await userService.create({
            name,
            email,
            password: randomstring.generate(),
            salt: randomstring.generate(),
            profilePicture,
            isNew: true,
            likes: [],
            reports: [],
        });

        const token = await authService.signToken(user._id);

        if(token){
            return res.status(200).send({ token, user: await userService.feedUserToWeb(user)});
        }else {
            return res.status(403).send({Error: 'Invalid credentials'});
        }
    }catch(error) {
        return res.status(500).send({msg: error.toString()})
    }
}

module.exports = {
    register,
    login, 
    socialMediaLogin
};


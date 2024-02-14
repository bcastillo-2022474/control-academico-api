import {Router} from 'express'
import User from "../model/user.js";

const route = Router()

route.route('/')
    .get(async (req, res) => {
        const {page = 0, limit = 10} = req.query

        const query = {tp_status: true}
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query).limit(limit).skip(page * limit)
        ]);
        const newUsers = await Promise.all([...users].map(async user => {
            const {
                name,
                email,
                password,
                role
            } = user;
            const roleDetails = await user.getRoleDetails();
            return {name, email, password, role, roleDetails}
        }))

        res.status(200).json({total, users: newUsers})
    })
    .post(async (req, res) => {
        const {name, email, password, role} = req.body
        const user = new User({name, email, password, role})

        await user.save();
        res.status(201).json(user)
    })


route.route('/:id')
    .get(async (req, res) => {
        const {id} = req.params

        const user = await User.findById(id)
        res.status(200).json(user)
    })
    .put(async (req, res) => {
        const {id} = req.params
        const {name, email, password, role} = req.body

        const user = await User.findByIdAndUpdate(id, {name, email, password, role});
        res.status(200).json(user)
    })
    .delete(async (req, res) => {
        const {id} = req.params

        const user = await User.findByIdAndUpdate(id, {tp_status: false});
        res.status(200).json(user)
    })

export default route;
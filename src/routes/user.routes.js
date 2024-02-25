import {Router} from 'express'
import User from "../model/user.js";

const route = Router()

async function getUserDetailsByRole(user) {
    const {role} = user;
    if (role === 'TEACHER') {
        const assignedCourses = await User.getCoursesTaughtByUser(user._id.toString());
        return {...user, assignedCourses};
    }
    if (role === 'STUDENT') {
        const enrolledCourses = await User.getCoursesEnrolledByUser(user._id.toString());
        return {...user, enrolledCourses};
    }
}

function isValidRole(role) {
    return role === 'TEACHER' || role === 'STUDENT'
}

route.route('/')
    .get(async (req, res) => {
        const {page = 0, limit = 10, role} = req.query
        const query = isValidRole(role) ? {tp_status: true, role} : {tp_status: true}
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
            return await getUserDetailsByRole({name, email, password, role, _id: user._id});
        }))
        res.status(200).json({total, page: Number(page), limit: Number(limit), users: newUsers})
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

        const user = await User.findOne({_id: id, tp_status: true});
        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }
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
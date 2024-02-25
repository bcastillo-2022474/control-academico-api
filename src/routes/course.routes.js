import {Router} from "express";
import Course from "../model/course.js";

const route = Router()

route.route('/')
    .get(async (req, res) => {
        const {page = 0, limit = 10} = req.query

        const query = {tp_status: true}
        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query).limit(limit).skip(page * limit)
        ])

        res.status(200).json({total, courses})
    })
    .post(async (req, res) => {
        const {title, description, teacher, students} = req.body
        const course = new Course({title, description, teacher, students})

        await course.save();
        res.status(201).json(course)
    })

route.route('/:id')
    .get()
    .put()
    .delete()

export default route;
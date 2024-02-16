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
        const {title, description, teacher} = req.body
        const course = new Course({title, description, teacher})

        await course.save();
        res.status(201).json(course)
    })

route.route('/:id')
    .get(async (req, res) => {
        const {id} = req.params
        const course = await Course.findById(id)

        if (!course) {
            return res.status(404).json({error: 'Course not found'})
        }

        res.status(200).json(course)
    })
    .put(async (req, res) => {
        const {id} = req.params
        const {title, description, teacher} = req.body
        const course = await Course.findByIdAndUpdate(id, {title, description, teacher})
        if (!course) {
            return res.status(404).json({error: 'Course not found'})
        }


        res.status(200).json({
            ...course._doc,
            title: title || course._doc.title,
            description: description || course._doc.description,
            teacher: teacher || course._doc.teacher
        })
    })
    .delete(async (req, res) => {
        const {id} = req.params
        const course = await Course.findByIdAndUpdate(id, {tp_status: false})
        if (!course) {
            return res.status(404).json({error: 'Course not found'})
        }

        res.status(200).json(course)
    })

export default route;
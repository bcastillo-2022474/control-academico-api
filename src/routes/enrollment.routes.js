import {Router} from "express";
import Enrollment from "../model/enrollment.js";

const router = Router()

router.route('/')
    .get(async (req, res) => {
        const {page = 0, limit = 10} = req.query

        const query = {tp_status: true}
        const [total, enrollments] = await Promise.all([
            Enrollment.countDocuments(query),
            Enrollment.find(query).limit(limit).skip(page * limit)
        ])

        res.status(200).json({total, enrollments})
    });

router.route('/:course')
    .post([async (req, res, next) => {
        // check that user isnt already enrolled
        const {course} = req.params
        const {student} = req.body
        const enrollment = await Enrollment.findOne({course, student, tp_status: true});
        if (enrollment) {
            return res.status(400).json({error: 'Student already enrolled'})
        }
        next();
    }], async (req, res) => {
        // enroll student to a course
        const {course} = req.params
        const {student} = req.body
        const enrollment = new Enrollment({course, student})
        await enrollment.save();
        res.status(201).json(enrollment)
    })
    .delete(async (req, res) => {
        const {course} = req.params
        // unenroll a student from a course
        const {student} = req.body
        const enrollment = await Enrollment.findOneAndUpdate({course, student, tp_status: true}, {tp_status: false});
        if (!enrollment) {
            return res.status(404).json({error: 'Student is not enrolled on course'})
        }
        res.status(200).json(enrollment)
    })

export default router
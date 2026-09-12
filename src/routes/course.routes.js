import {Router} from 'express';
import {getCourse, getCourseById, addCourse, updateCourse, deleteCourse} from '../controllers/course.controller.js';
const router = Router();


router.route('/').get(getCourse);
router.route('/:id').get(getCourseById);
router.route('/').post(addCourse);
router.route('/:id').put(updateCourse);
router.route('/:id').delete(deleteCourse);


export default router;
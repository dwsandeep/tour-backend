import {Router} from 'express';
import {addVideo, getVideos, getVideoById, updateVideo, deleteVideo} from '../controllers/video.controller.js'

const router = Router();
router.route("/add").post(addVideo);
router.route('/video').get(getVideos);
router.route('/video/:id').get(getVideoById);
router.route('/video/:id').put(updateVideo)
router.route('/video/:id').delete(deleteVideo)

export default router
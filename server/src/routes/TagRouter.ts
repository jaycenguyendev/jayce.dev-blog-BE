import TagController from "@/modules/tag/TagController";
import { Router } from "express";

const tagRouter = Router()

tagRouter.get('/', TagController.getTags)
tagRouter.get('/:slug', TagController.getTagsBySlug)

export default tagRouter
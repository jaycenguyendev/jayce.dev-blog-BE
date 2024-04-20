import TagController from "@/modules/tag/TagController";
import { Router } from "express";

const tagRouter = Router()

tagRouter.get('/', TagController.getTags)

export default tagRouter
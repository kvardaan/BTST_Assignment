import { Router } from "express"

import {
  doesTaskBelongToUser,
  doesTaskExistWithId,
  validateTask,
} from "../middleware/task.middleware"
import {
  getTasks,
  getTaskWithId,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = Router()

router.use(authMiddleware)

router.get("/", getTasks)
router.post("/", validateTask, addTask)
router.get("/:id", doesTaskExistWithId, doesTaskBelongToUser, getTaskWithId)
router.patch(
  "/:id",
  doesTaskExistWithId,
  doesTaskBelongToUser,
  validateTask,
  updateTask
)
router.delete("/:id", doesTaskExistWithId, doesTaskBelongToUser, deleteTask)

export { router as taskRoutes }

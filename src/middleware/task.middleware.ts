import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"

import { AuthRequest } from "./auth.middleware"
import prisma from "../utils/config/prismaClient"
import { taskSchema, taskType } from "../types/task.type"

export const validateTask = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const taskData: taskType = request.body

  const validatedTask = taskSchema.safeParse(taskData)

  if (!validatedTask.success) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: validatedTask.error.issues[0].message })
  }

  next()
}

export const doesTaskExistWithId = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params

  const existingTask = await prisma.task.findUnique({
    where: { id: Number(id) },
  })

  if (!existingTask) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Task doesnot exist!" })
    return
  }

  next()
}

export const doesTaskBelongToUser = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  })

  if (task?.userId !== request.id) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Task doesnot belong to user!" })
    return
  }

  next()
}

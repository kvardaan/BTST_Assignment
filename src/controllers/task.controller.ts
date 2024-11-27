import { StatusCodes } from "http-status-codes"
import { NextFunction, Response } from "express"

import { taskType } from "../types/task.type"
import prisma from "../utils/config/prismaClient"
import { AuthRequest } from "../middleware/auth.middleware"

// POST /api/v1/tasks - gets all tasks for a user
export const getTasks = async (request: AuthRequest, response: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: String(request.id) },
    })

    response.status(StatusCodes.OK).json(tasks)
    return
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `Error fetching tasks: ${error}`,
    })
    return
  }
}

// GET /api/v1/tasks/:id - gets a task with ID
export const getTaskWithId = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    })

    response.status(StatusCodes.OK).json(task)
    return
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `Error fetching task: ${error}`,
    })
    return
  }
}

// POST /api/v1/tasks - adds a task
export const addTask = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const taskData: taskType = request.body

  try {
    const newTask = await prisma.task.create({
      data: {
        ...taskData,
        userId: String(request.id),
      },
    })

    response
      .status(StatusCodes.CREATED)
      .json({ task: newTask, message: "Task added" })
    return
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `Error adding task: ${error}`,
    })
    return
  }
}

// PATCH /api/v1/tasks/:id - updates a task
export const updateTask = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params
  const taskData: taskType = request.body

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: taskData,
    })

    response.status(StatusCodes.OK).json(updatedTask)
    return
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }

    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `Error updating task: ${error}`,
    })
    return
  }
}

// DELETE /api/v1/tasks/:id - deletes a task
export const deleteTask = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params

  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    })

    response.status(StatusCodes.OK).json({
      message: "Task deleted successfully",
    })
    return
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `Error deleting task: ${error}`,
    })
    return
  }
}

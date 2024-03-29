class Api::V1::TasksController < ApplicationController

  def index
    tasks = Task.all
    render json: tasks
  end

  def show
    task = Task.find_by(task_id: params[:id])
    render json: task
  end

  def create
    task = Task.create(task_params)
    if task.save
      render json: {status: "SUCCESS", message: "Task Created", data: task}, status: :created
    else
      render json: task.errors, status: :unprocessable_entity
    end
  end
  
  def update
    task = Task.find_by(task_id: params[:id])
    
    if task.update(task_params)
      render json: {status: "SUCCESS", message: "Task Updated", data: task}, status: :ok
    else
      render json: task.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    task = Task.find_by(task_id: params[:id])
    task.destroy
    render json: {status: "SUCCESS", message: "Task Deleted", data: task}, status: :ok
  end

  def task_params
    params.require(:task).permit(:task_id, :name, :completed)
  end
end

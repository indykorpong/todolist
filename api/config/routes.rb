class TasksController < ApplicationController
  Rails.application.routes.draw do
    resources :tasks
  end
end

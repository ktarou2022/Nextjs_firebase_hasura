import React, { VFC, memo, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectTask, setEditedTask } from '../slices/uiSlice'
import { useAppMutate } from '../hooks/useAppMutate'
import { useQueryTasks } from '../hooks/useQueryTasks'

const TaskEdit: VFC = () => {
  const dispatch = useDispatch()
  const editedTask = useSelector(selectTask)

  console.log(useQueryTasks().data)
  const { createTaskMutation, updateTaskMutation } = useAppMutate()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '') {
      createTaskMutation.mutate(editedTask.title)
    } else {
      updateTaskMutation.mutate(editedTask)
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className='mb-3 px-3 py-2 border border-gray-300'
          placeholder='new task ?'
          type='text'
          value={editedTask.title}
          onChange={(e) =>
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }
        />
        <button
          className='disabled:opacity-40 my-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded'
          disabled={!editedTask.title}
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export const TaskEditMemo = memo(TaskEdit)
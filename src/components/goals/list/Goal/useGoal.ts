import { ElementRef, useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'

import { GoalProps } from '.'
import useGoals from '@src/shared/hooks/useGoals'

export default function useGoal({ id, name, checked, onCheck }: GoalProps) {
  const inputRef = useRef<ElementRef<typeof TextInput>>(null)

  const { changeGoalName } = useGoals()

  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(name)
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  function toggleEditing() {
    setInputValue(name)
    setIsEditing(state => !state)
  }

  function toggleChecked() {
    onCheck(id)
  }

  async function changeName() {
    await changeGoalName(id, inputValue)
    setIsEditing(false)
  }

  function openDeleteModal() {
    setDeleteModalVisible(true)
  }

  function closeDeleteModal() {
    setDeleteModalVisible(false)
  }

  return {
    id,
    name,
    changeName,
    checked,
    inputRef,
    inputValue,
    isEditing,
    setInputValue,
    toggleEditing,
    toggleChecked,
    openDeleteModal,
    closeDeleteModal,
    isDeleteModalVisible,
  }
}

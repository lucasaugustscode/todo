import React, { useState } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native'

import uuid from 'react-native-uuid'

import LogoSvg from '@assets/svgs/logo.svg'

import { ITaskDTO } from '@dtos/taskDTO'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Quantities } from '@components/Quantities'
import { TaskCard } from '@components/TaskCard'

import { theme } from '@global/theme'

import { styles } from './styles'

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<ITaskDTO[]>([])
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const [taskName, setTaskName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleCreateNewTask() {
    const data = {
      id: String(uuid.v4()),
      taskName
    }

    setTasks(prevState => [...prevState, data])
    setTaskName('')
  }

  function handleCompleteTask(id: string) {
    const checkAlreadyCompleted = completedTasks.includes(id)

    if (!checkAlreadyCompleted) {
      setCompletedTasks(prevState => [...prevState, id])
    } else {
      setCompletedTasks(completedTasks.filter(taskID => taskID !== id))
    }
  }

  function handleDeleteTask(id: string) {
    Alert.alert('Apagar tarefa', 'Você deseja deletar essa tarefa?', [
      {
        text: 'Sim',
        onPress: () => {
          setTasks(tasks.filter(task => task.id !== id))
          setCompletedTasks(completedTasks.filter(taskID => taskID !== id))
        }
      },
      {
        text: 'Não',
        style: 'destructive'
      }
    ])
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <LogoSvg />
        </View>

        <View style={styles.content}>
          <View style={styles.form}>
            <Input
              placeholder="Adicione uma nova tarefa"
              onChangeText={setTaskName}
              value={taskName}
            />
            <Button onPress={handleCreateNewTask} disabled={!taskName} />
          </View>

          <Quantities
            quantityCreated={tasks.length}
            quantityCompleted={completedTasks.length}
          />

          {isLoading ? (
            <ActivityIndicator
              style={styles.loading}
              color={theme.COLORS.gray_300}
              size="small"
            />
          ) : tasks.length ? (
            <ScrollView
              contentContainerStyle={styles.tasksList}
              showsVerticalScrollIndicator={false}
            >
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  taskName={task.taskName}
                  completed={completedTasks.includes(task.id)}
                  onPress={() => handleCompleteTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                  delay={index}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.empty}>
              <View style={styles.emptyContent}>
                <Text style={styles.emptytitle}>
                  Você ainda não tem tarefas cadastradas
                </Text>
                <Text style={styles.emptysubTitle}>
                  Crie tarefas e organize seus itens a fazer
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

import React, { useState, useEffect } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native'

import { Feather } from '@expo/vector-icons'

import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore'

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
  const [numberTasksCompleted, setNumberTasksCompleted] = useState(0)

  const [taskName, setTaskName] = useState('')

  const [isLoadingCreation, setIsLoadingCreation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreateNewTask() {
    try {
      setIsLoadingCreation(true)
      const generatedId = String(uuid.v4())

      await firestore()
        .collection('tasks')
        .doc(generatedId)
        .set({ taskName, done: false })

      setTaskName('')
    } catch {
      Alert.alert(
        'Ocorreu um erro',
        'Não foi possível criar sua tarefa. Tente mais tarde.'
      )
    } finally {
      setIsLoadingCreation(false)
    }
  }

  async function handleCompleteTask(id: string) {
    const response = await firestore().collection('tasks').doc(id).get()
    const taskSelectedById = response.data() as ITaskDTO

    await firestore()
      .collection('tasks')
      .doc(id)
      .update({ done: !taskSelectedById.done })
  }

  function handleDeleteTask(id: string) {
    Alert.alert('Apagar tarefa', 'Você deseja deletar essa tarefa?', [
      {
        text: 'Sim',
        onPress: async () => {
          await firestore().collection('tasks').doc(id).delete()
        }
      },
      {
        text: 'Não',
        style: 'destructive'
      }
    ])
  }

  useEffect(() => {
    async function loadCreatedTasks() {
      try {
        setIsLoading(true)

        const response = await firestore()
          .collection('tasks')
          .orderBy('taskName')
          .get()

        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as ITaskDTO[]

        setTasks(data)
      } catch {
        Alert.alert(
          'Ocorreu um erro',
          'Não foi possível carregar suas tarefas criadas. Tente mais tarde.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadCreatedTasks()
  }, [])

  useEffect(() => {
    async function monitorChangesInTasks() {
      try {
        const subscribe = firestore()
          .collection('tasks')
          .orderBy('taskName')
          .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              }
            }) as ITaskDTO[]

            setTasks(data)
            setNumberTasksCompleted(data.filter(task => task.done).length)
          })

        return () => subscribe()
      } catch {}
    }

    monitorChangesInTasks()
  }, [])

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
            <Button
              onPress={handleCreateNewTask}
              loading={isLoadingCreation}
              disabled={!taskName}
            />
          </View>

          <Quantities
            quantityCreated={tasks.length}
            quantityCompleted={numberTasksCompleted}
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
                  completed={task.done}
                  onPress={() => handleCompleteTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                  delay={index}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.empty}>
              <View style={styles.emptyContent}>
                <Feather style={styles.emptyImg} name="clipboard" />

                <Text style={styles.emptyTitle}>
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

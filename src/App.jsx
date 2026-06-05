import { useEffect, useId, useState } from 'react'
import './App.css'
import Modal from './components/Modal'
import TaskCard from './components/TaskCard'
import NoTask from './components/NoTask'

function App() {
  const [openModal, setOpenModal] = useState(false)
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const localTodos = localStorage.getItem('todos')

    if (localTodos) {
      setTasks(JSON.parse(localTodos))
    }
  }, [])

  const completedTasks = tasks.filter(task => task.isComplete);

  const handleAddTask = (title, description, isImportant) => {
    const newTask = {
      id: crypto.randomUUID(),
      isComplete: false,
      title,
      description,
      isImportant
    }

    setTasks([...tasks, newTask])
    localStorage.setItem('todos', JSON.stringify([...tasks, newTask]))

    setOpenModal(false)
  }

  const handleRemoveTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)

    localStorage.setItem('todos', JSON.stringify(updatedTasks))
  }

  const completeTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.isComplete = true
      }

      return task
    })

    setTasks(updatedTasks)
    localStorage.setItem('todos', JSON.stringify(updatedTasks))
  }

  const filteredTasks = () => {
    if (filter === 'all') {
      return tasks
    }

    if (filter === 'completed') {
      return tasks.filter(task => task.isComplete)
    }

    return tasks.filter(task => !task.isComplete)
  }

  return (
    <>
      <main className="container pb-25">
        <div id="headline" className="space-y-3">
          <h1 className="title">
            {/* <img src="./assets/images/hourglass.png" className="size-8" /> */}
            <span> مدیریت و برنامه ریزی </span>
          </h1>
        </div>

        <div
          className="mt-14 border-b w-full border-zinc-200 flex items-center py-3 justify-between"
        >
          <div></div>
          <div className="flex items-center gap-2">
            <div className="dropdown">
              <input id="dd-toggle" type="checkbox" hidden />

              <label className="dd-btn" htmlFor="dd-toggle">
                <span>
                  نمایش{' '}
                  {filter === 'all' ? 'همه' : filter === 'completed' ? 'تکمیل شده ها' : 'در انتظار انجام'}
                </span>
                <i className="fa-solid fa-chevron-down"></i>
              </label>

              <div className="dropdown_menu" role="menu">
                <div className="py-1">
                  <label htmlFor="dd-toggle" className="menu-item" onClick={() => setFilter('all')}>همه</label>
                  <label htmlFor="dd-toggle" className="menu-item" onClick={() => setFilter('completed')}>تکمیل شده ها</label>
                  <label htmlFor="dd-toggle" className="menu-item" onClick={() => setFilter('not-completed')}>در انتظار انجام</label>
                </div>
              </div>
            </div>

            <button id="open-dialog" onClick={() => setOpenModal(true)}>
              <span> ایجاد جدید </span>
              <div className="btn-divider"></div>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
        </div>

        {tasks.length ? (
          <section id="tasks" className="space-y-30 mt-5">
            {filter !== 'completed' && (
              <div className="space-y-5">
                <p className="text-sm">تسک های موجود:</p>
                {filteredTasks().map((task) => (
                  <TaskCard key={task.id} {...task} handleRemoveTask={handleRemoveTask} completeTask={completeTask} />
                ))}
              </div>
            )}

            {filter !== 'not-completed' && (
              <div className="space-y-5">
                <p className="text-sm">تسک‌های تکمیل‌شده</p>
                <div className="space-y-0.5">
                  {completedTasks.length ? completedTasks.map(task => (
                    <TaskCard key={task.id} {...task} handleRemoveTask={handleRemoveTask} completeTask={completeTask} />
                  )) : <NoTask />
                  }
                </div>
              </div>
            )}
          </section>
        ) : (
          <NoTask />
        )}

      </main>

      {openModal && <Modal onClose={() => setOpenModal(false)} handleAddTask={handleAddTask} />}

    </>
  )
}

export default App;

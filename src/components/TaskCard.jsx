import { useEffect } from "react"

const TaskCard = ({ id, title, description, isImportant, isComplete, handleRemoveTask, completeTask }) => {
    useEffect(() => {
        console.log(`TaskCard.jsx Mounting ${title}`)

        return () => {
            console.log(`TaskCard.jsx UnMounting ${title}`)
        }
    }, [])

    // updating 1
    // useEffect(() => {
    //     console.log(`TaskCard.jsx Updating ${title}`)
    // })


    // updating 2
    useEffect(() => {
        console.log(`TaskCard.jsx Updating ${title}`)
    }, [isComplete])

    return (
        <article className="task-card done completed">
            <div className="task-content">
                <div>
                    <h3>
                        {title}
                    </h3>
                    <p className="task-desc">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center **:min-w-max gap-2">
                    {isComplete && <span className="status-label completed"> تکمیل شده </span>}
                    {isImportant && <span className="priority code-1"> مهم </span>}
                </div>
                <div className="moderate-btns">
                    <button className="complete-task" onClick={() => completeTask(id)}>
                        <i className="fa-solid fa-circle-check"></i>
                    </button>
                    <button className="undone-btn" onClick={() => handleRemoveTask(id)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </article>
    )
}

export default TaskCard
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import Draggable from "../draggable/draggable";
import { Droppable } from "../droppable/droppable";
import TaskCard from "../task-card/task-card";
import styles from "./task-columns.module.css";
import type { Task } from "../../types/graphql";

interface TaskColumnsProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
  activeTask: Task | null;
}

const status = [
  { label: "Backlog", value: "BACKLOG" },
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "DONE" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function TaskColumns({
  tasks,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  activeTask,
}: TaskColumnsProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={styles.taskList}>
        {status.map((item, index) => {
          const filteredTasks = tasks.filter(
            (task) => task.status === item.value,
          );
          return (
            <Droppable id={item.value} key={index}>
              <div className={styles.taskListColumn}>
                <h2 className={styles.taskListColumnStatus}>
                  {item.label} ({filteredTasks.length})
                </h2>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div className={styles.taskCardWrapper} key={task.id}>
                      <Draggable id={task.id}>
                        <TaskCard
                          title={task.name}
                          pointEstimate={task.pointEstimate}
                          dueDate={task.dueDate}
                          taskTags={task.tags}
                          assignee={task.assignee ?? undefined}
                          onEdit={() => onEdit(task)}
                          onDelete={() => onDelete(task)}
                        />
                      </Draggable>
                    </div>
                  ))
                ) : (
                  <p>No tasks in {item.label}</p>
                )}
              </div>
            </Droppable>
          );
        })}
        <DragOverlay>
          {activeTask ? (
            <TaskCard
              title={activeTask.name}
              pointEstimate={activeTask.pointEstimate}
              dueDate={activeTask.dueDate}
              taskTags={activeTask.tags}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

import styles from "./skeleton-kanban-board.module.css";

const columns = [1, 2, 3];
const card = [1, 2, 3];

export default function SkeletonKanbanBoard() {
  return (
    <div className={styles.container}>
      {columns.map((_, colIndex) => (
        <div key={colIndex} className={styles.column}>
          {card.map((_, cardIndex) => (
            <div key={cardIndex} className={styles.card}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

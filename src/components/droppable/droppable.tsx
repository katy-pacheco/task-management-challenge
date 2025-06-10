import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

interface DroppableProps {
  id: string;
  children: ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    borderColor: isOver ? "white" : undefined,
    transition: "all 0.2s ease",
  };

  return (
    <div ref={setNodeRef} style={style} className="min-h-full">
      {children}
    </div>
  );
}

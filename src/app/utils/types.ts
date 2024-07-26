export interface Attack {
  name: string;
  description: string;
  color: string;
  textColor: string;
}
export interface DocumentAreaProps {
  readonly draggedItem: HTMLElement | null;
  readonly setBeingDragged: React.Dispatch<React.SetStateAction<boolean>>;
  readonly scale: any;
}

export interface HabilityDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly setBeingDragged: any;
  readonly setDragItem: any;
}
export interface ComponentPosition {
  id: number;
  left: number;
  top: number;
  type: string;
  name: string;
}

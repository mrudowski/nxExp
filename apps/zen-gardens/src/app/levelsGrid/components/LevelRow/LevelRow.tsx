import styles from './styles.module.scss';

interface LevelRowProps {
  id: number;
  active: boolean;
  onActivate: (id: number) => void;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

const LevelRow = ({id, active, onActivate, onAdd, onRemove}: LevelRowProps) => {
  return (
    <div
      key={id}
      role="row"
      aria-label={`level-${id}`}
      aria-selected={active}
      onClick={() => {
        onActivate(id);
      }}
      className={styles.levelRow}
    >
      level {id}
      {active ? <>(x)</> : <>( )</>}
      <button
        onClick={e => {
          onAdd(id);
          e.stopPropagation();
        }}
      >
        +
      </button>
      <button
        onClick={e => {
          onRemove(id);
          e.stopPropagation();
        }}
      >
        x
      </button>
    </div>
  );
};

export default LevelRow;

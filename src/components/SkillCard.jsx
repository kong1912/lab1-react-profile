function SkillCard({ skill, index, onDelete, isReact }) {
  return (
    <li 
      style={{
        backgroundColor: '#e7f3ff',
        padding: '8px 12px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #007bff',
        color: isReact ? 'blue' : 'black',
        fontWeight: isReact ? 'bold' : 'normal'
      }}
    >
      {skill}
      <button 
        onClick={() => onDelete(index)}
        style={{cursor: 'pointer', background: 'none', border: 'none', color: 'red', fontSize: '16px'}}
      >
        ×
      </button>
    </li>
  );
}

export default SkillCard;

function SkillCard({ skill }) {
  return (
    <li 
      style={{
        backgroundColor: '#e7f3ff',
        padding: '8px 12px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid #007bff'
      }}
    >
      {skill}
    </li>
  );
}

export default SkillCard;

import { useState } from 'react';
import SkillCard from './components/SkillCard';

function App() {

  const [skills, setSkills] = useState(['React', 'JavaScript']);
  const [newSkill, setNewSkill] = useState("");


  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
      <h1>Dynamic Skill Tags</h1>
      
      <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill"
          style={{padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
        />
        <button onClick={addSkill} style={{padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none'}}>
          Add
        </button>
      </div>

      {}
      {skills.length > 0 ? (
        <ul style={{display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none', padding: 0}}>
          {}
          {skills.map((skill) => (
            <SkillCard 
              key={skill}
              skill={skill}
            />
          ))}
        </ul>
      ) : (
        <p style={{color: '#999'}}>No skills added yet. Add one to get started!</p>
      )}
    </div>
  );
}

export default App;

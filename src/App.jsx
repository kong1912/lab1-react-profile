import { useState } from 'react';
import SkillCard from './components/SkillCard';

function App() {

  const [skills, setSkills] = useState(['React', 'JavaScript']);
  const [newSkill, setNewSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const filteredSkills = skills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteSkill = (indexToDelete) => {
    const updatedSkills = skills.filter((_, index) => index !== indexToDelete);
    setSkills(updatedSkills);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
      <h1>Dynamic Skill Tags</h1>
      
      {}
      <div style={{display: 'flex', gap: '10px', marginBottom: '20px', width: '100%', justifyContent: 'center'}}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search skills..."
          style={{padding: '8px', borderRadius: '5px', border: '1px solid #ccc', minWidth: '200px'}}
        />
      </div>

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
      {filteredSkills.length > 0 ? (
        <ul style={{display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none', padding: 0}}>
          {filteredSkills.map((skill, index) => {
            const originalIndex = skills.indexOf(skill);
            return (
              <SkillCard 
                key={originalIndex}
                skill={skill}
                index={originalIndex}
                onDelete={deleteSkill}
                isReact={skill.includes("React")}
              />
            );
          })}
        </ul>
      ) : (
        <p style={{color: '#999'}}>No results found</p>
      )}
    </div>
  );
}

export default App;

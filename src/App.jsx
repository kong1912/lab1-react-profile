import { useState, useEffect } from 'react';
import SkillCard from './components/SkillCard';
import ProfileCard from './components/ProfileCard';

function App() {

  const [skills, setSkills] = useState(['React', 'JavaScript']);
  const [newSkill, setNewSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [githubData, setGithubData] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  const username = "kong1912";

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('User not found');
        }
        return res.json();
      })
      .then(data => {
        setGithubData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDarkMode = theme === 'dark';
  const bgColor = isDarkMode ? '#1a1a1a' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const inputBgColor = isDarkMode ? '#2a2a2a' : '#ffffff';
  const inputBorderColor = isDarkMode ? '#444' : '#ccc';

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px',
      backgroundColor: bgColor,
      color: textColor,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>
      <button 
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 12px',
          borderRadius: '5px',
          border: `1px solid ${inputBorderColor}`,
          backgroundColor: inputBgColor,
          color: textColor,
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      
      {loading && (
        <p style={{color: '#1E90FF', fontSize: '18px', fontWeight: 'bold'}}>⏳ Loading data from GitHub...</p>
      )}

      {error && (
        <p style={{color: '#FF6B6B', fontSize: '18px', fontWeight: 'bold'}}>❌ {error} - Please check the username</p>
      )}

      {githubData ? (
        <ProfileCard
          name={githubData.name || githubData.login}
          role="GitHub User"
          bio={githubData.bio || "No bio available"}
        />
      ) : (
        !loading && !error && <p>Unable to load profile</p>
      )}
      
      {!loading && !error && (
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px', width: '100%', justifyContent: 'center', marginTop: '20px'}}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills..."
            style={{
              padding: '8px', 
              borderRadius: '5px', 
              border: `1px solid ${inputBorderColor}`,
              backgroundColor: inputBgColor,
              color: textColor,
              minWidth: '200px'
            }}
          />
        </div>
      )}

      {!loading && !error && (
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            style={{
              padding: '8px', 
              borderRadius: '5px', 
              border: `1px solid ${inputBorderColor}`,
              backgroundColor: inputBgColor,
              color: textColor
            }}
          />
          <button onClick={addSkill} style={{padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none'}}>
            Add
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;

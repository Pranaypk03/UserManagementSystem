import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<{ name: string; email: string; bio: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put('/api/profile/edit', profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Handle successful update
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div>
      {profile && (
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div>
            <label>Bio:</label>
            <input
              type="text"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>
          <button onClick={handleUpdate}>Update Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;

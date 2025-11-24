import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/users/`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            setUser(data.data[0]);
          } else {
            // Mock data fallback
            setUser({
              id: 1,
              name: 'Ahmet Yılmaz',
              email: 'ahmet@example.com',
              avatar_url: 'https://via.placeholder.com/150/667eea/FFFFFF?text=AY',
              created_at: new Date().toISOString()
            });
          }
        } else {
          throw new Error('Kullanıcı verileri alınamadı');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        // Mock data fallback
        setUser({
          id: 1,
          name: 'Ahmet Yılmaz',
          email: 'ahmet@example.com',
          avatar_url: 'https://via.placeholder.com/150/667eea/FFFFFF?text=AY',
          created_at: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const stats = [
    { label: 'Siparişler', value: '12', icon: '📦' },
    { label: 'Favoriler', value: '8', icon: '❤️' },
    { label: 'Yorumlar', value: '23', icon: '💬' }
  ];

  const recentActivities = [
    { action: 'iPhone 14 siparişi verildi', time: '2 saat önce', icon: '🛒' },
    { action: 'Samsung Galaxy favorilere eklendi', time: '1 gün önce', icon: '❤️' },
    { action: 'Java Kitabı yorumu yapıldı', time: '2 gün önce', icon: '💬' }
  ];

  if (loading) {
    return (
      <div className="user-profile loading">
        <div className="spinner"></div>
        <p>Profil yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar-section">
          <img 
            src={user.avatar_url} 
            alt={user.name}
            className="avatar"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/150/667eea/FFFFFF?text=${user.name.charAt(0)}`;
            }}
          />
          <div className="user-info">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
            <span className="member-since">
              Üye since {new Date(user.created_at).getFullYear()}
            </span>
          </div>
        </div>
        
        <button className="edit-profile-btn">
          ✏️ Profili Düzenle
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profil
        </button>
        <button 
          className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          📊 Aktivite
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile-details">
            <div className="detail-item">
              <label>Tam Adı:</label>
              <span>{user.name}</span>
            </div>
            <div className="detail-item">
              <label>E-posta:</label>
              <span>{user.email}</span>
            </div>
            <div className="detail-item">
              <label>Telefon:</label>
              <span>+90 555 123 4567</span>
            </div>
            <div className="detail-item">
              <label>Adres:</label>
              <span>İstanbul, Türkiye</span>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-feed">
            <h4>Son Aktiviteler</h4>
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-actions">
        <button className="action-btn primary">🚀 Premium'a Yüksel</button>
        <button className="action-btn secondary">⚙️ Ayarlar</button>
        <button className="action-btn danger">🚪 Çıkış Yap</button>
      </div>
    </div>
  );
};

// Global scope'a export et
if (typeof window !== 'undefined') {
  window.UserProfile = UserProfile;
}

export default UserProfile;
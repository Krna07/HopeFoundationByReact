import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserProvider';

const Notifications = () => {
  const { userData } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'donation_success',
      title: 'Donation Successful',
      message: 'Your donation of $50 to Education has been processed successfully.',
      timestamp: '2025-01-15T10:30:00Z',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'impact_update',
      title: 'Impact Update',
      message: 'Your donations have helped feed 25 children this month!',
      timestamp: '2025-01-14T15:45:00Z',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Milestone Achieved',
      message: 'Congratulations! You\'ve reached Bronze level impact.',
      timestamp: '2025-01-13T09:20:00Z',
      read: true,
      priority: 'high'
    },
    {
      id: 4,
      type: 'cause_update',
      title: 'Cause Update',
      message: 'New Education campaign launched. Help us reach 1000 students!',
      timestamp: '2025-01-12T14:15:00Z',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Monthly Reminder',
      message: 'Consider making your monthly donation to continue your impact.',
      timestamp: '2025-01-10T08:00:00Z',
      read: true,
      priority: 'low'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    const unread = mockNotifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'donation_success':
        return '✅';
      case 'impact_update':
        return '📈';
      case 'milestone':
        return '🏆';
      case 'cause_update':
        return '📢';
      case 'reminder':
        return '⏰';
      default:
        return '🔔';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <div className="notifications-controls">
          <div className="filter-tabs">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All ({notifications.length})
            </button>
            <button 
              className={filter === 'unread' ? 'active' : ''}
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button className="mark-all-read" onClick={markAllAsRead}>
              Mark All Read
            </button>
          )}
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <h3>No notifications</h3>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${!notification.read ? 'unread' : ''} ${getPriorityColor(notification.priority)}`}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="notification-time">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
                <p className="notification-message">{notification.message}</p>
                <div className="notification-priority">
                  {notification.priority === 'high' && <span className="priority-badge high">High Priority</span>}
                  {notification.priority === 'medium' && <span className="priority-badge medium">Medium Priority</span>}
                  {notification.priority === 'low' && <span className="priority-badge low">Low Priority</span>}
                </div>
              </div>

              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="mark-read-btn"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    ✓
                  </button>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete notification"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notification Settings */}
      <div className="notification-settings">
        <h3>Notification Preferences</h3>
        <div className="settings-grid">
          <div className="setting-item">
            <label>
              <input type="checkbox" defaultChecked />
              <span>Donation confirmations</span>
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" defaultChecked />
              <span>Impact updates</span>
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" defaultChecked />
              <span>Milestone achievements</span>
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" />
              <span>Campaign updates</span>
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" />
              <span>Monthly reminders</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

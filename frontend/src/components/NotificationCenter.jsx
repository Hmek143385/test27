import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function NotificationCenter() {
  const [notifs, setNotifs] = useState([]);
  const [show, setShow] = useState(false);
  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    fetch('/api/notifications', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then(r => r.json()).then(setNotifs);
    const socket = io();
    socket.on('notification', notif => {
      setNotifs(n => [notif, ...n]);
    });
    return () => socket.disconnect();
  }, []);

  const markAsRead = async id => {
    await fetch(`/api/notifications/${id}/read`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setNotifs(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };

  const deleteNotif = async id => {
    setNotifs(n => n.filter(notif => notif.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button onClick={() => setShow(s => !s)} className="relative bg-white rounded-full shadow p-2">
        <span role="img" aria-label="notif">🔔</span>
        {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">{unreadCount}</span>}
      </button>
      {show && (
        <div className="bg-white shadow rounded p-4 w-80 mt-2">
          <h3 className="font-bold mb-2">Notifications</h3>
          <ul>
            {notifs.map(n => (
              <li key={n.id} className={n.read ? 'text-gray-400 flex items-center' : 'font-semibold flex items-center'}>
                <span className="flex-1">{n.message}</span>
                {!n.read && <button onClick={() => markAsRead(n.id)} className="ml-2 text-blue-600 text-xs">Marquer comme lue</button>}
                <button onClick={() => deleteNotif(n.id)} className="ml-2 text-red-600 text-xs">Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationCenter;
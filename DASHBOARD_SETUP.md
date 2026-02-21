# SmartGuide IoT Dashboard - Setup Guide

## 🎉 What's New

Your SmartGuide website now includes a **modern, fully functional admin dashboard** with:

### ✨ Features Implemented

#### 1. **Authentication System** 🔐
- Login screen with professional design
- Demo credentials: Use any email and password
- Remember me functionality
- Logout capability
- User session management

#### 2. **Emergency Alert System** 🚨
- One-click emergency trigger
- Visual alert banner with location data
- Keyboard shortcut: Press **E** to trigger emergency
- Auto-deactivate after response (demo: 30 seconds)
- Activity log integration

#### 3. **Modern Dashboard** 📊
- **Admin Dashboard** header with real-time updates
- **Quick Status Cards:**
  - 📍 Device Status (Online/Offline with signal strength)
  - 🔋 Battery Level (with visual battery bar)
  - 🚨 Emergency Status (Quick alert indicator)
  - 👤 User Information (Active user ID)

#### 4. **Live Location Tracking** 📍
- Interactive Leaflet.js map
- Custom location markers with pulse animation
- Accuracy circle visualization
- Zoom controls (+/- buttons)
- Center map button
- Real-time location updates every 10 seconds
- Automatically detects user location (or uses San Salvador default)

#### 5. **Activity Log** 📜
- Real-time event logging
- Device status changes
- Battery alerts
- Location updates
- Emergency events
- Keeps last 15 entries

#### 6. **Dark Mode** 🌙
- Toggle between light and dark themes
- Persistent preference (saved in localStorage)
- System preference detection
- Smooth transitions

#### 7. **Modern UI Design**
- Gradient backgrounds
- Smooth animations
- Responsive layout (mobile, tablet, desktop)
- Color-coded status indicators
- Professional typography
- Shadow effects and depth

---

## 🚀 How to Use

### **Login**
1. Open `index.html` in your browser
2. Enter any email and password (for demo, any value works)
3. Click "Sign In"

### **Emergency Alert**
- Click the red "Emergency" button in the top right
- Or press **E** on your keyboard
- A banner will appear with location information
- Alert auto-deactivates after 30 seconds

### **Navigate Dashboard**
- Check device status, battery level, and emergency status in quick cards
- View live location on the interactive map
- Check activity log for recent events
- Use zoom controls on the map
- Toggle dark mode with moon icon

### **Logout**
- Click user avatar in top right
- Select "Logout"
- You'll return to the login screen

---

## 📁 Files Created/Modified

### **New Files:**
- `css/dashboard.css` - Modern dashboard styles
- `js/auth.js` - Authentication system
- `js/emergency.js` - Emergency alert system

### **Modified Files:**
- `index.html` - Complete redesign with new structure
- `js/dashboard.js` - Updated with dark mode and initialization
- `js/map.js` - Enhanced with custom markers and features
- `js/darkmode.js` - Enhanced system preference detection

---

## 🎨 Design Features

### Color Scheme
- **Primary:** Indigo (#6366f1)
- **Secondary:** Blue (#3b82f6)
- **Success:** Green (#10b981)
- **Warning:** Amber (#f59e0b)
- **Danger:** Red (#ef4444)

### Animations
- Smooth fade-ins on load
- Pulse effects on emergency indicators
- Slide transitions for modals
- Hover effects on interactive elements

### Responsive Design
- Mobile optimized (< 480px)
- Tablet friendly (480px - 768px)
- Desktop full experience (> 768px)

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **E** | Trigger Emergency Alert |
| **X** | Close Modal |

---

## 🔧 Customization

### Change Emergency Auto-Deactivate Time
Edit `js/emergency.js`, line ~68:
```javascript
setTimeout(deactivateEmergency, 30000); // Change 30000 to desired milliseconds
```

### Modify Default Location
Edit `js/map.js`, line ~38:
```javascript
.setView([13.6929, -89.2182], 13); // Change coordinates
```

### Adjust Auto-Location Update Frequency
Edit `js/map.js`, line ~195:
```javascript
}, 10000); // Change 10000 to desired milliseconds
```

---

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ IE11 (limited support)

---

## 📱 Responsive Testing

The dashboard is fully responsive. Test on:
- Desktop (1920x1080)
- Tablet (768px width)
- Mobile (375px width)

---

## 🔒 Security Notes (For Production)

⚠️ **Current Implementation:** Uses localStorage for demo storage.

For production, you should:
1. Implement real backend authentication
2. Use secure session tokens
3. Add CSRF protection
4. Validate all user inputs
5. Use HTTPS only
6. Implement rate limiting for emergency alerts

---

## 🐛 Known Features

### Current Demo Limitations
- Email validation is minimal (accepts any format)
- No real backend integration
- Location uses browser geolocation API
- Emergency alerts don't send real notifications
- Activity log is simulated

### Future Enhancements
- WebSocket for real-time updates
- Push notifications
- Email/SMS alerts
- Data export functionality
- Advanced analytics
- Multiple device management

---

## 💡 Tips

1. **Test Emergency Alert:** Click the red Emergency button to see the banner
2. **Dark Mode:** Toggle moon icon to switch themes
3. **Map Zoom:** Use +/- buttons or scroll wheel
4. **Location Updates:** Map updates automatically every 10 seconds
5. **Remember Credentials:** Check "Remember me" on login

---

## 📞 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify all files are in correct directories
3. Clear browser cache if styles don't update
4. Ensure Leaflet.js CDN is accessible

---

## 📝 License

This project is part of SmartGuide IoT System.

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Created with:** HTML5, CSS3, JavaScript (Vanilla), Leaflet.js
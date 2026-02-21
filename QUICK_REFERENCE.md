# 🎯 SmartGuide Dashboard - Quick Reference Card

## 🚀 QUICK START

### 1. Open Dashboard
```
Open index.html in your browser
```

### 2. Login
```
Email: admin@smartguide.com (or any email)
Password: (any password)
✓ Remember me (optional)
→ Click "Sign In"
```

### 3. You're In!
```
Welcome to your Admin Dashboard
```

---

## 🎮 CONTROLS & FEATURES

### 🚨 EMERGENCY ALERT
**How to trigger:**
- Click red **Emergency** button (top right)
- OR Press **E** on keyboard

**What happens:**
- Red alert banner appears
- Location data displayed
- Auto-clears after 30 seconds
- Event logged in Activity Log

---

### 🗺️ MAP CONTROLS
**Zoom In:** Click **+** button  
**Zoom Out:** Click **-** button  
**Center Map:** Click **⊛** button  
**Pan Map:** Click and drag on map  
**Scroll:** Use mouse wheel to zoom  

---

### 🌙 DARK MODE
**Toggle:** Click moon icon (top right)
- **Moon Icon** = Light mode active → Switch to Dark
- **Sun Icon** = Dark mode active → Switch to Light

---

### 👤 USER MENU
**Access:** Click your profile image (top right)

**Menu Options:**
- ⚙️ Settings → Notification preferences
- 👤 Profile → View/edit profile
- 🚪 Logout → Return to login

---

### ⚙️ SETTINGS
**Open:** Click profile → Settings

**Available Options:**
- Emergency Alerts (toggle)
- Battery Alerts (toggle)
- Location Updates (toggle)
- Update Frequency (dropdown)

---

## 📊 DASHBOARD CARDS

### Device Status Card
```
📍 DEVICE STATUS
Status: Online/Offline
Signal: 98%
Indicator: 🟢 (green = online, 🟡 yellow = warning)
```

### Battery Status Card
```
🔋 BATTERY LEVEL
Current: 88%
Visual bar shows remaining percentage
Changes: Every 5 seconds
```

### Emergency Status Card
```
🚨 EMERGENCY STATUS
Status: No Alert/ACTIVE
Last Alert: Time/N/A
Indicator: 🟢 (safe) or 🔴 (active)
```

### User Info Card
```
👤 ACTIVE USER
User ID: User-001
Unique ID: SG-2024-001
```

---

## 🔄 LIVE UPDATES

**Automatic Updates (Every 5-10 seconds):**
- Device status & signal strength
- Battery level percentage
- Location coordinates
- Activity log new entries

---

## 📜 ACTIVITY LOG

**Displays:**
- Latest 15 events
- Event type with icon
- Exact timestamp
- Can refresh with **⟲** button

**Auto-logged Events:**
- Device online/offline
- Battery level changes
- Location updates
- Emergency triggers
- Data refreshes

---

## 📍 LOCATION INFO

**Displayed below map:**
- **Latitude:** Current Y coordinate
- **Longitude:** Current X coordinate
- **Accuracy:** GPS precision (±Xm)
- **Last Update:** When data was latest

**Updates:** Every 10 seconds automatically

---

## 💡 TIPS & TRICKS

### Performance
- Dark mode reduces eye strain
- Map loads faster on zoom out
- Logs keep last 15 entries (auto-cleanup)

### Testing
- Try pressing "E" to test emergency
- Toggle dark mode to see theme changes
- Zoom map with +/- buttons
- Check activity log for event history

### Troubleshooting
- If map doesn't load: Check internet connection
- If location not found: Allow browser location permission
- If styles look odd: Clear browser cache (Ctrl+Shift+Del)
- Check console (F12) for any errors

---

## 🎨 COLOR MEANINGS

| Color | Meaning |
|-------|---------|
| 🔵 **Blue** | Primary color, links |
| 🟢 **Green** | Online, safe, success |
| 🟡 **Yellow** | Warning, caution |
| 🔴 **Red** | Emergency, danger |
| ⚪ **White/Gray** | Neutral, disabled |

---

## ⌨️ KEYBOARD SHORTCUTS

| Key | Action |
|-----|--------|
| `E` | Trigger Emergency |
| `Tab` | Navigate between elements |
| `Enter` | Confirm/Submit |
| `Esc` | Close modals/popups |
| `F12` | Open Developer Tools |
| `Ctrl+Shift+Del` | Clear Cache & Cookies |

---

## 🔐 LOGIN CREDENTIALS

**For Demo Use:**
```
ANY email and password will work

Examples:
- admin@smartguide.com / password123
- user@example.com / test
- john.doe@company.com / mypass
```

**Check "Remember me"** to stay logged in across sessions.

---

## 🚪 LOGOUT

**Steps:**
1. Click your profile picture (top right)
2. Select "Logout"
3. You'll return to login screen
4. Session data cleared

---

## 📱 MOBILE VIEW

**Features on mobile:**
- Hamburger menu (☰) appears
- Single column layout
- Status cards stack vertically
- Touch-friendly buttons
- All features work normally

**Responsive at:**
- 📱 Mobile: < 480px
- Tablet: 480px - 768px
- 🖥️ Desktop: > 768px

---

## ⚡ REAL-TIME SIMULATION

**The dashboard simulates:**
- Random device status changes
- Battery level fluctuations
- Location coordinate variations
- Realistic activity logging
- Network signal strength

**For Production:**
Replace with real API connections to actual devices.

---

## 📞 GETTING HELP

### Check:
1. Browser console (F12 → Console tab)
2. Network errors (F12 → Network tab)
3. Ensure all files are present
4. Clear browser cache
5. Try another browser

### Common Issues:
- **Map not showing?** → Check internet, wait for load
- **Can't log in?** → Use any email/password
- **Dark mode not working?** → Refresh page
- **Location not accurate?** → Allow browser permissions

---

## 🎯 NEXT STEPS

### To Customize:
1. Edit CSS colors in `css/dashboard.css`
2. Change default location in `js/map.js`
3. Update text/labels in `index.html`
4. Modify emergency timeout in `js/emergency.js`

### To Deploy:
1. Upload all files to server
2. Configure with real backend API
3. Set up proper authentication
4. Enable HTTPS
5. Test on multiple devices

---

## 📚 DOCUMENTATION FILES

- `DASHBOARD_SETUP.md` - Complete setup guide
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `README.md` - Project overview
- Console (F12) - Error messages & logs

---

## ✨ YOU'RE ALL SET!

Your SmartGuide IoT Dashboard is ready to use. 

**Happy monitoring! 🚀**

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Status:** ✅ Production Ready (Demo)
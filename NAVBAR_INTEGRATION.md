# NavBar Integration Guide

## Overview
The `NavBar` component is a fully responsive navigation component that displays:
- **Desktop**: Fixed sidebar (320px width, md breakpoint)
- **Mobile**: Hamburger menu drawer

## Features

### Header Section
- Open/close button for mobile
- "Chatwme" branding
- Total conversation count with icon
- Search field for filtering conversations

### Conversations List
- Participant initials in avatar circle
- Participant name
- Last message preview (truncated)
- Timestamp (formatted as: "5m atrás", "2h atrás", etc.)
- Green online indicator dot when participant is online

### Bottom User Section
- User initials avatar
- User nickname/name
- Connection code display
- Copy button for connection code (with visual feedback)
- Settings button (links to `/settings`)
- Logout button

## Integration with Real Data

### Step 1: Replace Mock Data
Replace the `mockConversations` and `mockUser` objects with actual API calls.

```typescript
// Example with hooks for fetching real data:
import { useEffect, useState } from 'react';

const NavBarContent = ({ ... }) => {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch conversations
    fetch('/api/conversations')
      .then(res => res.json())
      .then(data => setConversations(data))
      .catch(err => console.error(err));

    // Fetch current user
    fetch('/api/auth/user')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ... rest of component
};
```

### Step 2: Update Data Field Mapping
Ensure your API returns data matching this structure:

```typescript
interface Conversation {
  id: string;                      // Unique identifier
  participantName: string;         // Display name of other participant
  participantImage: string;        // Initials (e.g., "JS" for "João Silva")
  lastMessage: string;             // Preview of last message
  timestamp: Date;                 // When message was sent
  isOnline: boolean;               // Online status indicator
}

interface User {
  name: string;                    // User's full name
  image: string;                   // User's initials
  connectionCode: string;          // Unique connection code
}
```

### Step 3: Real-Time Updates
For online status and new messages, implement WebSocket or polling:

```typescript
useEffect(() => {
  const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

  socket.on('user:online', (userId) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === userId ? { ...conv, isOnline: true } : conv
      )
    );
  });

  socket.on('user:offline', (userId) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === userId ? { ...conv, isOnline: false } : conv
      )
    );
  });

  socket.on('message:new', (message) => {
    // Update conversation with new message
    setConversations(prev =>
      prev.map(conv =>
        conv.id === message.conversationId
          ? {
              ...conv,
              lastMessage: message.content,
              timestamp: new Date(message.createdAt),
            }
          : conv
      )
    );
  });

  return () => socket.disconnect();
}, []);
```

### Step 4: Update Backend Models
Ensure your backend models include the necessary online status tracking. You may need to add an `onlineStatus` or `lastSeenAt` field to the User model:

```prisma
model User {
  // ... existing fields
  onlineStatus    String    @default("offline") // "online" | "offline" | "away"
  lastSeenAt      DateTime  @updatedAt
}
```

## Responsive Behavior

### Mobile (< 768px)
- Hamburger menu button in header
- Full-width drawer with navbar content
- Header with app name

### Desktop (≥ 768px)
- Fixed left sidebar (320px)
- Full navigation bar always visible
- Main content automatically offset by sidebar width

## Styling Customization

To customize colors and styles, modify the Tailwind classes in `NavBar.tsx`:

- **Avatar colors**: Change `bg-blue-500` to any Tailwind color
- **Border colors**: Change `border-gray-200` to customize borders
- **Hover states**: Modify `hover:bg-gray-50` for interaction feedback
- **Text colors**: Update `text-gray-900`, `text-gray-600` as needed

## Component Props

The `NavBar` component accepts no props currently, but the `NavBarContent` component is modular and can be extracted if you need multiple instances or different configurations.

## Usage

Simply import and use in your layout:

```tsx
import { NavBar } from '@/components/NavBar';

export default function Page() {
  return (
    <div>
      <NavBar />
      <main className="md:ml-80 ml-0 pt-16 md:pt-0">
        {/* Your page content */}
      </main>
    </div>
  );
}
```

## API Endpoints Expected

Based on the component, you'll likely need these endpoints:

- `POST /api/auth/signout` - Sign out user
- `GET /api/conversations` - List all conversations
- `GET /api/auth/user` - Get current user data
- `GET /api/conversations/:id` - Get specific conversation (for routing)

## Notes

- The component uses the `better-auth` library for authentication
- Timestamps are formatted relative to current time
- The search function filters conversations client-side (consider server-side pagination for large lists)
- Connection code copy feedback persists for 2 seconds
- All text is in Portuguese by default (customize as needed)

# House Warming Invite App

A Next.js application with a custom Express server for handling housewarming invitations, guest management, and secure admin access.

## 🏗 Architecture

This project uses a **Custom Express Server** (`server.js`) to handle API routes and serve the Next.js frontend.
- **Frontend**: Next.js (React)
- **Backend**: Express.js (handling API routes like login, invite verification)
- **Database**: MongoDB (via Mongoose)

### Key Technologies & Dependencies

- **Framework**: `next` (React framework for production)
- **Server**: `express` (Custom server for fine-grained control over routes and cookies)
- **Database**: `mongoose` (MongoDB object modeling)
- **Authentication**: `cookie-parser` (Cookie handling), `nanoid` (Token generation)
- **Styling**: `tailwindcss`, `tailwind-merge`, `clsx`, `lucide-react` (Icons)
- **Animation**: `framer-motion`, `lottie-react`

## 🔐 Authentication & Security

### Admin Access
- **Method**: Password-based authentication.
- **Credential**: Validates against `ADMIN_PASSWORD` environment variable.
- **Session**: Sets a secure `httpOnly` cookie named `admin_token` upon successful login.
- **Expiration**: Admin session lasts for 24 hours.

### Guest Access (Token System)
Guests access their invites via a unique link containing a generated **Token**.

1. **Token Generation**:
   - Random 10-character string generated using `nanoid`.
   - Stored in MongoDB with guest details (`guestName`, `isUsed`, `expiresAt`).

2. **Access Control**:
   - **First Visit**: When a guest visits their link `.../invite/[token]`:
     - System checks if the token exists and is unused.
     - Marks the token as `isUsed: true`.
     - Sets a long-lived `invite_token` cookie (30 days) in the user's browser.
   - **Subsequent Visits**:
     - System verifies that the `invite_token` cookie matches the URL token.
     - **Security**: This prevents the link from being shared and accessed by others after it has been opened once.

3. **Multi-Device Support**:
   - By default, a token is bound to the first device/browser that opens it (via cookie).
   - **Admin Override**: Admins can toggle "Allow Multiple Devices" for a specific invite.
   - If enabled, the cookie check is bypassed, allowing the link to be opened on other devices (e.g., phone and laptop).

## 🚀 API Endpoints

### Admin
- `POST /api/admin/login`: Authenticate admin.
- `POST /api/admin/logout`: Clear admin session.
- `GET /api/admin/invites`: List all invites (Protected).
- `POST /api/invite/generate`: Create a new invite token (Protected).
- `PUT /api/admin/invite/:token/toggle-multidevice`: Enable/disable multi-device access for a token (Protected).

### Public / Guest
- `GET /api/invite/:token`: Validate token and retrieve invite details. Handles "first use" logic.
- `POST /api/blessing`: Submit a greeting/message for the host.

## 🛠 Setup & Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_PASSWORD=your_secure_password
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   # Starts server on http://localhost:3000 (or PORT env var)
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```
